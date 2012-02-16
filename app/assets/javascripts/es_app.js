var ESApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(response) {
    this.search = new ESApp.Models.Search(response);

    new ESApp.Routers.Tweets();
    if (!Backbone.history.start()) {
      Backbone.history.start({ pushState: true });
      Backbone.history.started = true;
    }
  }
};
