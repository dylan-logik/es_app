ESApp.Views.FacetItem = Backbone.View.extend({

  tagName: "td",
  className: "facet-item",

  initialize: function() {
    _.bindAll(this, 'render');
  },

  render: function() {
    this.renderTemplate();
    this.renderContents();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['facets/item']());
  },

  renderContents: function() {
    var self = this;

    this.$('.name').text(this.model.escape('name'));
    this.$('.total').text(this.model.escape('total'));

    this.model.get('terms').each(function(term) {
      var row = new ESApp.Views.FacetTerm({ model: term });
      row.render();
      self.$('ul').append(row.el);
    });
  }
});
