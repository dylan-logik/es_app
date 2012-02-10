var ESApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(tweets) {
    console.debug('tweets');
    console.debug(tweets);
    this.tweets = new ESApp.Collections.Tweets(tweets)

    new ESApp.Routers.Tweets({ collection: this.tweets});
    if (!Backbone.history.start()) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }
};
