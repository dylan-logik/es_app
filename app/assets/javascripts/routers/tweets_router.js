ESApp.Routers.Tweets = Backbone.Router.extend({
  initialize: function(options) {
    this.el = $('#body');
    //this.model= options.model;
  },

  routes: {
    "": "index",
    ":id": "show"
  },

  index: function() {
    var view = new ESApp.Views.SearchForm({ model: ESApp.search });
    $('body').html(view.render().el);
  },

  show: function(id) {
    var view = new ESApp.Views.TweetShow({ model: ESApp.search.results.get(id) });
    $('body').html(view.render().el);
  }
});
