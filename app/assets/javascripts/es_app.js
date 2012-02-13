var ESApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(response) {
    this.tweets = new ESApp.Collections.Tweets(response.tweets);
    this.facets = new ESApp.Collections.TweetFacets(response.facets);

    new ESApp.Routers.Tweets({ collection: response});
    if (!Backbone.history.start()) {
      Backbone.history.start({ pustState: true });
      Backbone.history.started = true;
    }
  }
};
