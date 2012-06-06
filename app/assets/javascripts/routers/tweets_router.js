ESApp.Routers.Tweets = Support.SwappingRouter.extend({
  initialize: function() {
    this.el = $('.container');
  },

  routes: {
    "": "index",
    ":id": "show"
  },

  index: function() {
    var view = new ESApp.Views.Main({ collection: ESApp.search_history });
    this.swap(view);
  },

  show: function(id) {
    var tweet = new ESApp.Models.Tweet({ id: id });
    tweet.fetch();
    console.debug(tweet);
    var view = new ESApp.Views.TweetShow({ model: tweet });
    this.swap(view);
  }
});
