ESApp.Routers.Tweets = Support.SwappingRouter.extend({
  initialize: function(options) {
    this.el = $('.container');
    this.search = options.model;
  },

  routes: {
    "": "index",
    ":id": "show"
  },

  index: function() {
    var view = new ESApp.Views.SearchForm({ model: ESApp.search });
    ESApp.mainView = view;
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
