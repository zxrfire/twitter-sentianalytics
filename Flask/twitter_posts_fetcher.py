import dotenv
import json
import requests
import os
<<<<<<< HEAD
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
=======
from jsonmerge import Merger

schema = {
    "properties": {
        "data": {
            "mergeStrategy": "append"
        }
    }
}
merger = Merger(schema)
dotenv.load_dotenv()
>>>>>>> 9282b81277b207b94c017a5d06e22840f0ea474f

dotenv.load_dotenv()
nltk.download('vader_lexicon')
twitter_url = 'https://api.twitter.com/2/tweets/search/recent?max_results=100&query='
oath = {'Authorization': 'Bearer ' + os.environ.get('BEARER_TOKEN')}
listtopics = ['nft']
next_token = -1
count = 0
listtomerge = []
newjson = {}
if __name__ == "__main__":
<<<<<<< HEAD
    twitter_url = twitter_url + 'nft'
    pag1 = requests.get(twitter_url, headers=oath)
    data = pag1.json()

    sia = SentimentIntensityAnalyzer()
    # sia.polarity_scores("Wow, NLTK is really powerful!")


    sentimentScores = []

    totalNeg, totalNeu, totalPos, totalCompound = 0, 0, 0, 0

    for x in data["data"]:
        print(sia.polarity_scores(x["text"]))

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

    with open('results.json', 'w') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

=======
    for topic in listtopics:
        current_url = twitter_url + topic
        for i in range(0, 10):  # request 10 times for 1000 things
            if next_token != -1:
                new_url = current_url + '&next_token=' + str(next_token)
            else:
                new_url = current_url
            pag1 = requests.get(new_url, headers=oath)
            data = pag1.json()
            next_token = data['meta']['next_token']
            listtomerge.append(data)
        for d in listtomerge:
            newjson = merger.merge(newjson, d)
        with open(topic+'.json', 'w', encoding="utf-8") as f:
            json.dump(newjson, f, ensure_ascii=False, indent=2)
        newjson = {}
>>>>>>> 9282b81277b207b94c017a5d06e22840f0ea474f
