ESApp.Views.DocumentsIndex = Backbone.View.extend({
  initalize: function() {
    _.bindAll(this, "render");
    this.collection.bind("add", this.render);
  },

  render: function() {
    this.renderTemplate();
    this.renderDocuments();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['documents/index']());
  },

  renderDocuments: function() {
    var self = this;
    this.collection.each(function(doc) {
      var row = new ESApp.Views.DocumentItem({ model: doc });
      row.render();
      self.$('tbody').append(row.el);
    });
  }
});
