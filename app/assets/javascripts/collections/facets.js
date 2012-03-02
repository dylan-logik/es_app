ESApp.Collections.Facets = Backbone.Collection.extend({

  model: function(attr, options) {
    switch (attr['_type']) {
      case 'terms':
        new ESApp.Models.Facet(attr, options);
      default:
        new ESApp.Models.Facet(attr, options);
    }
  },

  pivot: function(facets, options) {
    console.debug(facets);
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
