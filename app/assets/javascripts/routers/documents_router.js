ESApp.Routers.Documents = Backbone.Router.extend({
  initializze: function(options) {
    this.el = $('#documents');
    this.collection = options.collection;
  },

  routes: {
    "": "index"
  },

  index: function() {
    console.debug('index');
    var view = new ESApp.Views.DocumentsIndex({ collection: ESApp.documents });
    $('body').html(view.render().el);
  }
});
