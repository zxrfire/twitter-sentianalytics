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

dtformat = '%Y-%m-%dT%H:%M:%SZ'
from datetime import datetime, timedelta

app = Flask(__name__)

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


@app.route('/search/<query>')
def search(query):
    time = datetime.utcnow()
    current_url = twitter_url + query + ' lang:en' + '&tweet.fields=created_at'
    listToMerge = []
    newjson = {}
    for i in range(1, 6):  # request 1 times for 500 things but by differing dates
        end_time = time - timedelta(days=i)
        end_time = end_time.strftime(dtformat)
        new_url = current_url + '&end_time=' + end_time
        pag1 = requests.get(new_url, headers=oath)
        data = pag1.json()
        listToMerge.append(data)
    for d in listToMerge:
        newjson = merger.merge(newjson, d)
    return newjson


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


@app.route('/')
def main():
    next_token = -1
    count = 0
    listTopics = ['almond latte', 'boba', 'dji mavic', 'reactjs']

    for topic in listTopics:
        listToMerge = []
        newjson = {}
        time = datetime.now()
        time = datetime.utcnow()
        current_url = twitter_url + topic + ' lang:en' + '&tweet.fields=created_at'
        for i in range(1, 6):  # request 2 times for 1000 things but by differing dates
            end_time = time - timedelta(days=i)
            end_time = end_time.strftime(dtformat)
            if next_token != -1:
                # new_url = current_url + '&next_token=' + str(next_token) + '&end_time=' + end_time
                new_url = current_url + '&end_time=' + end_time
            else:
                new_url = current_url + '&end_time=' + end_time
            pag1 = requests.get(new_url, headers=oath)
            data = pag1.json()

            if 'next_token' not in data['meta']:
                break
            next_token = data['meta']['next_token']
            listToMerge.append(data)
        for d in listToMerge:
            newjson = merger.merge(newjson, d)
        print(topic + ' \n')
        print(newjson)
        lst = []
        if 'data' in newjson:
            lst.append(getSentimentreturn(newjson["data"]))
        return {'data': lst}
