# A Rails application w/ Backbone

## This is a Rails 3.2 application using Backbone.js and ElasticSearch.

To get started you must install [ElasticSearch](http://www.elasticsearch.org). Then run `bin/plugin -install elasticsearch/elasticsearch-river-twitter/1.1.0` to install [ElasticSearch Twitter River](https://github.com/elasticsearch/elasticsearch-river-twitter).

Once you have everything installed, you can run the `ruby_river.sh` script to start the river and update the mapping.

Now you can start the Rails app and begin searching the Twitter Stream.
