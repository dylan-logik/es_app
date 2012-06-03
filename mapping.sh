#!/bin/bash

curl -XPUT "http://localhost:9200/tweets/tweet/_mapping" -d '
"tweet": {
  "properties": {
    "tags": {
      "type": "multi_field",
      "fields": {
        "tags": {
          "type": "string"
        },
        "untouched": {
          "index": "not_analyzed",
          "type": "string",
        }
      }
    },
    "user": {
      "properties": {
      "name": {
        "type": "multi_field",
        "fields": {
          "name": {
            "type": "string"
          }
          "untouched": {
            "index": "not_analyzed",
            "type": "string"
          }
        }
      }
    }
  }
}
'
