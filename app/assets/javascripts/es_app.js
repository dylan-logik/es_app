var ESApp = {
  Mixins: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(response) {
    this.search_history = new ESApp.Collections.SearchHistory();
    var search = new ESApp.Models.Search(response);
    new ESApp.Routers.Tweets(search);
    if (!Backbone.history.start()) {
      Backbone.history.start({ pushState: true });
      Backbone.history.started = true;
    }
  }
};
