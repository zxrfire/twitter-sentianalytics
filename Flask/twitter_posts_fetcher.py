import dotenv
import json
import requests
import os
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

dotenv.load_dotenv()
nltk.download('vader_lexicon')
twitter_url = 'https://api.twitter.com/2/tweets/search/recent?max_results=100&query='
oath = {'Authorization': 'Bearer ' + os.environ.get('BEARER_TOKEN')}

if __name__ == "__main__":
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

