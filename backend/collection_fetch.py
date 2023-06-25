# TO DELETE FOR NOW

import requests
import json

url = "https://flashy-old-star.discover.quiknode.pro/b64d2659a0871f264e2cddcfdbd2ba054cc77498/"

payload = json.dumps({
  "id": 67,
  "jsonrpc": "2.0",
  "method": "qn_fetchNFTsByCollection",
  "params": [{
    "collection": "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
    "omitFields": [
      "traits"
    ],
    "page": 1,
    "perPage": 10
  }]
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
