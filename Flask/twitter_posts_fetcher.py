import json
import requests
import os
import key

twitter_url = 'https://api.twitter.com/2/tweets/search/recent?max_results=100&query='
oath = {'Authorization': 'Bearer ' + key.bearer_Token}

if __name__ == "__main__":
    twitter_url = twitter_url + 'nft'
    pag1 = requests.get(twitter_url, headers=oath)
    data = pag1.json()
    with open('pag1.txt', 'w') as f:
        f.write(json.dumps(data))

