import dotenv
import json
import requests
import os
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from jsonmerge import Merger
from flask import Flask
import pprint

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


def getSentiment(data):
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
        "avgNeg": totalNeg/100,
        "avgNeu": totalNeu/100,
        "avgPos": totalPos/100,
        "avgCompound": totalCompound/100,
        "scores": sentimentScores
    }

    with open(topic + '.json', 'w') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":

    next_token = -1
    count = 0
    listTopics = ['almond latte', 'mango boba', 'bluepill', 'react query']

    for topic in listTopics:
        listToMerge = []
        newjson = {}

        current_url = twitter_url + topic + ' lang:en' + '&tweet.fields=created_at'
        for i in range(0, 10):  # request 10 times for 1000 things
            if next_token != -1:
                new_url = current_url + '&next_token=' + str(next_token)
            else:
                new_url = current_url
            pag1 = requests.get(new_url, headers=oath)
            data = pag1.json()

            if 'next_token' not in data['meta']:
                break
            next_token = data['meta']['next_token']
            listToMerge.append(data)
        for d in listToMerge:
            newjson = merger.merge(newjson, d)

        print(newjson)
        if 'data' in newjson:
            getSentiment(newjson["data"])
