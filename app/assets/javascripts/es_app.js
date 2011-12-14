var ESApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function(documents) {
    new ESApp.Routers.Documents();
    this.documents = new ESApp.Collections.Documents(documents);
    Backbone.history.start();
  }
};
