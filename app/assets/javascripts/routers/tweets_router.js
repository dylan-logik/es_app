ESApp.Routers.Tweets = Backbone.Router.extend({
  initialize: function(options) {
    this.el = $('#tweets');
    this.collection = options.collection;
  },

  routes: {
    "": "index",
    ":id": "show"
  },

  index: function() {
    ESApp.tweets.fetch();
    var view = new ESApp.Views.TweetsIndex({ collection: ESApp.tweets });
    var facet_view = new ESApp.Views.TweetsFacetsIndex({ collection: ESApp.facets });
    $('body').html(facet_view.render().el);
    $('body').append(view.render().el);
  },

  show: function(tweetId) {
    var tweet = this.collection.get(taskId);
    var tweetsRouter = this;
    task.fetch({
      success: function() {
        var view = new ESApp.View.TweetShow({ model: tweet });
        tweetsRouter.swap(view);
      }
    });
  }
});
