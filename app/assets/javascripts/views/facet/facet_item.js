ESApp.Views.FacetItem = Backbone.View.extend({
  tagName: "td",

  initialize: function() {
    _.bindAll(this, 'render');
  },

  render: function() {
    this.renderTemplate();
    this.renderContents();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['facets/item']({ 'terms': this.model.attributes.terms }));
  },

  renderContents: function() {
    this.$('.name').text(this.model.escape('name'));
    this.$('.total').text(this.model.escape('total'));
  },

  toString: function() {
    this.model.get('name') + " <span class='facet-total'>(" + this.model.get('total') + ")</span>";
  }
});
