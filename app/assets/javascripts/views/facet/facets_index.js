ESApp.Views.FacetsIndex = Support.CompositeView.extend({

  id: "facets",
  className: "facets",
  type: 'facets_index',
  
  initialize: function() {
    _.bindAll(this, 'render');
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
      var facetItem = new ESApp.Views[self.facetToString(facet)]({ model: facet });
      self.renderChild(facetItem);
      self.$('tbody > tr').append(facetItem.el);
    });
  },

  facetToString: function(facet) {
    return $.map(facet.get('_type').split('_'), function(part) { return part.charAt(0).toUpperCase() + part.slice(1); }).join('') + 'Facet';
  }
});
