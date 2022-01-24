import dotenv
import json
import requests
import os
dotenv.load_dotenv()

twitter_url = 'https://api.twitter.com/2/tweets/search/recent?max_results=100&query='
oath = {'Authorization': 'Bearer ' + os.environ.get('BEARER_TOKEN')}

if __name__ == "__main__":
    twitter_url = twitter_url + 'nft'
    pag1 = requests.get(twitter_url, headers=oath)
    data = pag1.json()
    with open('pag1.json', 'w') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


