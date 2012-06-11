#!/bin/bash

curl -XPUT "http://localhost:9200/_river/twitter_river/_meta" -d '
  {
    "type": "twitter",
    "twitter": {
      "user": "elmobleek",
      "password": "Tw1tt3r!",
      "filter": {
        "track": "ruby rails elasticsearch dc dmv javascript node dcrug java scala"
      }
    },
    "index": {
      "index": "tweets",
      "type": "tweet",
      "bulk_size": 100
    }
  }
'
