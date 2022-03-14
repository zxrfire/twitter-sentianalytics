import dotenv
import json
import requests
import os
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
from jsonmerge import Merger
from flask import Flask

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


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

if __name__ == "__main__":
    app.run()

    next_token = -1
    count = 0
    listTopics = ['nft', 'ukraine', 'russia', 'incel']

    for topic in listTopics:
        listToMerge = []
        newjson = {}

        current_url = twitter_url + topic
        for i in range(0, 10):  # request 10 times for 1000 things
            if next_token != -1:
                new_url = current_url + '&next_token=' + str(next_token)
            else:
                new_url = current_url
            pag1 = requests.get(new_url, headers=oath)
            data = pag1.json()
            next_token = data['meta']['next_token']
            listToMerge.append(data)
        for d in listToMerge:
            newjson = merger.merge(newjson, d)
        getSentiment(newjson["data"])
