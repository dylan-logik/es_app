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
    var view = new ESApp.Views.TweetShow({ model: ESApp.search.results.get(id) });
    this.swap(view);
  }
});
