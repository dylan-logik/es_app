var ESApp = {
  Mixins: {},
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(response) {
    console.debug(response);
    this.search = new ESApp.Models.Search(response);
    new ESApp.Routers.Tweets();
    if (!Backbone.history.start()) {
      Backbone.history.start({ pushState: true });
      Backbone.history.started = true;
    }

    /* Probably don't want this. Maybe for SearchResults
    setInterval(function() {
      ESApp.search.fetch();
    }, 60000);
    */
  }
};
