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
    $(this.el).html(JST['documents/index']({ documents: this.collection }));
  },

  renderDocuments: function() {
    var self = this;
    this.collection.each(function(document) {
      var row = new ESApp.Views.DocumentItem({ model: document });
      //self.renderChild(row);
      self.$('tbody').append(row.el);
    });
  }
});
