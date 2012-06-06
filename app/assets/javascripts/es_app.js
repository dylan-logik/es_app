var ESApp = {
  Mixins: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(bootstrap) {
    var search = new ESApp.Models.Search(bootstrap);
    this.search_history = new ESApp.Collections.SearchHistory([search]);
    new ESApp.Routers.Tweets();
    if (!Backbone.history.start()) {
      Backbone.history.start({ pushState: true });
      Backbone.history.started = true;
    }
  }
};
