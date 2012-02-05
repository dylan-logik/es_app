ESApp.Views.DocumentItem = Backbone.View.extend({
  tagName: "tr",

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function() {
    $(this.el).html(JST['documents/item']({ document: this.model }));
    this.renderContents();
    return this;
  },

  renderContents: function() {
    this.$('label').text(this.model.escape('name'));
  }
});
