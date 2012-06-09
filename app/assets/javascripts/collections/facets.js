ESApp.Collections.Facets = Backbone.Collection.extend({
  
  model: function(attr, options) {
    switch (attr['_type']) {
      case 'terms':
        return new ESApp.Models.TermsFacet(attr, options);
      case 'range':
        return new ESApp.Models.RangeFacet(attr, options);
      case 'statistical':
        return new ESApp.Models.StatisticalFacet(attr, options);
      case 'date_histogram':
        return new ESApp.Models.DateFacet(attr, options);
      default:
        return new ESApp.Models.TermsFacet(attr, options);
    }
  },

  pivot: function(facets, options) {
    options || (options = {});
    options['silent'] = true;
    _.each(this.models, function(facet, i) {
      if (!facet.locked()) {
        facet.pivot(facets[i], options);
      }
    });
    this.trigger('pivot');
  },

  filters: function() {
    var and = [];
    this.each(function(facet) {
      var f = facet.filters();
      if (f[facet.boolType].length > 0) {
        and.push(f);
      }
    });

    return and;
  },

  selectedFacets: function() {
    var items = [];
    this.each(function(facet) {
      if(facet.selectedItems) {
        if(facet.selectedItems().length > 0) {
          items.push(facet);
        }
      }
    });
    return items;
  }
});
