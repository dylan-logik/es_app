ESApp.Routers.Tweets = Backbone.Router.extend({
  initialize: function(options) {
    this.el = $('#tweets');
    //this.model= options.model;
  },

  routes: {
    "": "index",
    "tweets/:id": "show"
  },

  index: function() {
    var view = new ESApp.Views.SearchForm({ model: ESApp.search });
    $('body').html(view.render().el);
  },

  show: function(id) {
    var view = new ESApp.Views.TweetShow({ model: ESApp.search.get('results').get(id) });
    $('body').html(view.render().el);
  }
});
