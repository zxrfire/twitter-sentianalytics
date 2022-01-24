import dotenv
import json
import requests
import os
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

twitter_url = 'https://api.twitter.com/2/tweets/search/recent?max_results=100&query='
oath = {'Authorization': 'Bearer ' + os.environ.get('BEARER_TOKEN')}
listtopics = ['nft']
next_token = -1
count = 0
listtomerge = []
newjson = {}
if __name__ == "__main__":
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
