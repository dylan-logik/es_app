var ESApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(response) {
    this.search = new ESApp.Models.Search(response);
    //this.tweets = new ESApp.Collections.SearchResults(response.tweets);
    //this.facets = new ESApp.Collections.Facets(response.facets);

    new ESApp.Routers.Tweets();
    if (!Backbone.history.start()) {
      Backbone.history.start({ pushState: true });
      Backbone.history.started = true;
    }
  }
};
