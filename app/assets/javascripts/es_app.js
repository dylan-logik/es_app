var ESApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(documents) {
    console.debug(documents);
    this.documents = new ESApp.Collections.Documents(documents)

    new ESApp.Routers.Documents({ collection: this.documents });
    if (!Backbone.history.start()) {
      Backbone.history.start();
      Backbone.history.started = true;
    }
  }
};
