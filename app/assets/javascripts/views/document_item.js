ESApp.Views.DocumentItem = Backbone.View.extend({
  tagName: "tr",

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function() {
    this.renderTemplate();
    this.renderContents();
    return this;
  },
  
  renderTemplate: function() {
    $(this.el).html(JST['documents/item']());
  },

  renderContents: function() {
    this.$('#name').text(this.model.escape('name'));
    this.$('#page_count').text(this.model.escape('page_count'));
  }
});
