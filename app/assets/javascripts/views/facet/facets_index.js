ESApp.Views.FacetsIndex = Support.CompositeView.extend({

  id: "facets",
  className: "facets row",
  
  initialize: function() {
    _.bindAll(this, 'render');
  },

  render: function() {
    var self = this;
    this.collection.each(function(facet) {
      var facetName = self.facetToString(facet);
      if (_.has(ESApp.Views, facetName)) {
        var facetItem = new ESApp.Views[facetName]({ model: facet });
        self.renderChild(facetItem);
        self.$el.append(facetItem.el);
      }
    });
    return this;
  },

  facetToString: function(facet) {
    return $.map(facet.get('_type').split('_'), function(part) { return part.charAt(0).toUpperCase() + part.slice(1); }).join('') + 'Facet';
  }
});
