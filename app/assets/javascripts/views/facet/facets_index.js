ESApp.Views.FacetsIndex = Backbone.View.extend({
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('refresh', this.render);
  },

  render: function() {
    this.renderTemplate();
    this.renderContents();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['facets/index']());
  },

  renderContents: function() {
    var self = this;
    this.collection.each(function(facet) {
      var facet_item = new ESApp.Views.FacetItem({ model: facet });
      self.$('tbody > tr').append(facet_item.render().el);
    });
  }
});
