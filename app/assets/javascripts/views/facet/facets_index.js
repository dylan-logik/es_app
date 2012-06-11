ESApp.Views.FacetsIndex = Support.CompositeView.extend({

  id: "facets",
  className: "facets row",
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.on('pivot', this.render);
  },

  render: function() {
    console.debug('FacetsIndex#render');
    this._leaveChildren();
    var self = this;
    this.collection.each(function(facet) {
      var facetName = self.facetToString(facet);
      if (_.has(ESApp.Views, facetName) && facet.get('_type') != 'date_histogram') {
        var facetItem = new ESApp.Views[facetName]({ model: facet });
        self.appendChild(facetItem);
      }
    });
    return this;
  },

  renderDateHistogram: function() {
    var dateFacet = this.collection.find(function(facet) { return facet.get('_type') == 'date_histogram'; });
    var dateFacetView = new ESApp.Views.DateFacetView({ model: dateFacet });
    this.renderChild(dateFacetView);
    this.$el.append(dateFacetView.el);
  },

  facetToString: function(facet) {
    return $.map(facet.get('_type').split('_'), function(part) { return part.charAt(0).toUpperCase() + part.slice(1); }).join('') + 'Facet';
  }
});
