import dotenv
import json

import flask
import requests
import os
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from jsonmerge import Merger
from flask import Flask
import pprint
import aiohttp
import asyncio
from flask import request as flask_request
from flask_cors import CORS

dtformat = '%Y-%m-%dT%H:%M:%SZ'
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

dotenv.load_dotenv()
nltk.download('vader_lexicon')
twitter_url = 'https://api.twitter.com/2/tweets/search/recent?max_results=100&query='
oath = {'Authorization': 'Bearer ' + os.environ.get('BEARER_TOKEN')}

schema = {
    "properties": {
        "data": {
            "mergeStrategy": "append"
        }
    }
}
merger = Merger(schema)
sia = SentimentIntensityAnalyzer()
listTopics = ['almond latte', 'boba', 'dji mavic', 'reactjs']


@app.route('/search/<query>')
async def search(query):
    num_days = flask_request.args.get('num_days') or 30
    async with aiohttp.ClientSession() as session:
        fut = await asyncio.gather(*[
            asyncio.ensure_future(searchfetch(session, query, num_days))
        ])
        return {'data': fut}


async def searchfetch(session, query, num_days):
    time = datetime.utcnow()
    current_url = twitter_url + query + ' lang:en' + '&tweet.fields=created_at'
    listToMerge = []
    res = []
    for i in range(1, (int(num_days) + 1) * 24):  # request 1 times for 500 things but by differing dates
        end_time = time - timedelta(hours=i)
        end_time = end_time.strftime(dtformat)
        new_url = current_url + '&end_time=' + end_time
        async with session.get(new_url, headers=oath) as resp:
            data = await resp.json()
            listToMerge.append(data)
            sentimentScores = getSentimentreturn(data["data"])
            res.append({
                "end_time": end_time,
                "sentiment": sentimentScores
            })
            return {"data": res}


def getSentimentreturn(data):
    sentimentScores = []
    totalNeg, totalNeu, totalPos, totalCompound = 0, 0, 0, 0
    for x in data:

        sentiment = sia.polarity_scores(x["text"])
        sentimentScores.append({
            "text": x["text"],
            "created_at": x["created_at"],
            "neg": sentiment["neg"],
            "neu": sentiment["neu"],
            "pos": sentiment["pos"],
            "compound": sentiment["compound"],
        })

        totalNeg += sentiment["neg"]
        totalNeu += sentiment["neu"]
        totalPos += sentiment["pos"]
        totalCompound += sentiment["compound"]

    results = {
        "avgNeg": totalNeg / 100,
        "avgNeu": totalNeu / 100,
        "avgPos": totalPos / 100,
        "avgCompound": totalCompound / 100,
        "scores": sentimentScores
    }
    return results


async def fetch(client, item):
    listToMerge = []
    newjson = {}
    time = datetime.utcnow()
    current_url = twitter_url + item + ' lang:en' + '&tweet.fields=created_at'
    for i in range(1, 6):  # request 2 times for 1000 things but by differing dates
        end_time = time - timedelta(days=i)
        end_time = end_time.strftime(dtformat)
        new_url = current_url + '&end_time=' + end_time
        async with client.get(new_url, headers=oath) as resp:
            data = await resp.json()
            listToMerge.append(data)
            for d in listToMerge:
                newjson = merger.merge(newjson, d)
            print(item + ' \n')
            print(newjson)
            lst = []
            if 'data' in newjson:
                lst.append(getSentimentreturn(newjson["data"]))
            return lst


@app.route('/')
async def main():
    async with aiohttp.ClientSession() as session:
        fut = await asyncio.gather(*[
            asyncio.ensure_future(fetch(session, item))
            for item in listTopics
        ])
        return {'data': fut}
