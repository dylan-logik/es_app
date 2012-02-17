ESApp.Models.Facet = Backbone.RelationalModel.extend({
  relations: [{
    type: Backbone.HasMany,
    key: 'terms',
    relatedModel: 'ESApp.Models.FacetTerm',
    reverseRelation: {
      key: 'facet'
    }
  }],
});
