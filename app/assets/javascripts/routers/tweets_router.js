ESApp.Routers.Tweets = Backbone.Router.extend({
  initialize: function(options) {
    this.el = $('#tweets');
    this.collection = options.collection;
  },

  routes: {
    "": "index"
  },

  index: function() {
    var view = new ESApp.Views.TweetsIndex({ collection: ESApp.tweets });
    $('body').html(view.render().el);
  }
});
