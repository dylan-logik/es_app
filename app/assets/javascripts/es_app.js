var ESApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(documents) {
    console.debug(documents);
    this.documents = new ESApp.Collections.Documents(documents);

    new ESApp.Routers.Documents();
    if (!Backbone.history.started) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }
};
