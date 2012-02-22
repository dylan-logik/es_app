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

  initialize: function() {
    this.set({ selected: false });
  },

  selected: function() {
    var selected_terms = terms.select(function(term) { return term.get('selected'); });
    return selected_terms.length > 0
  },

  filters: function() {
    return this.get('terms').filters();
  }

});
