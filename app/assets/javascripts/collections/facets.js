ESApp.Collections.Facets = Backbone.Collection.extend({
  model: ESApp.Models.Facet,

  pivot: function(facets, options) {
    //console.debug('FacetCollection#pivot');
    options || (options = {});
    options['silent'] = true;
    _.each(this.models, function(facet, i) {
      facet.pivot(facets[i], options);
    });
  },

  filters: function() {
    var and = [];
    this.each(function(facet) {
      var f = facet.filters();
      if (f.or.length > 0) {
        and.push(f);
      }
    });

    return { "and": and };
  }
});
