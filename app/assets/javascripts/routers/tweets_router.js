ESApp.Routers.Tweets = Backbone.Router.extend({
  initialize: function(options) {
    this.el = $('#tweets');
    this.collection = options.collection;
  },

  routes: {
    "": "index"
  },

  index: function() {
    ESApp.tweets.fetch();
    var view = new ESApp.Views.TweetsIndex({ collection: ESApp.tweets });
    var facet_view = new ESApp.Views.TweetsFacetsIndex({ collection: ESApp.facets });
    $('body').html(facet_view.render().el);
    $('body').append(view.render().el);
  }
});
