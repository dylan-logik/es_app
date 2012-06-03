#!/bin/bash

curl -XPUT "http://localhost:9200/_river/twitter_river/_meta" -d '
  {
    "type": "twitter",
    "twitter": {
      "user": "",
      "password": "",
      "filter": {
        "tracks": "ruby,rails,elasticsearch"
      }
    },
    "index": {
      "index": "tweets",
      "type": "status",
      "bulk_size": 100
    }
  }
'
