ESApp.Models.Facet = Backbone.RelationalModel.extend({
  relations: [{
    type: Backbone.HasMany,
    key: 'terms',
    relatedModel: 'ESApp.Models.FacetTerm',
    collectionType: 'ESApp.Collections.FacetTerms',
    reverseRelation: {
      key: 'facet'
    }
  }],

  filters: function() {
    return this.get('terms').filters();
  }

});
