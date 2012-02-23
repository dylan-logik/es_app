ESApp.Models.Facet = Backbone.RelationalModel.extend({
  idAttribute: 'name',

  relations: [{
    type: Backbone.HasMany,
    key: 'terms',
    relatedModel: 'ESApp.Models.FacetTerm',
    collectionType: 'ESApp.Collections.FacetTerms',
    reverseRelation: {
      key: 'facet'
    }
  }],
  
  pivot: function(model, options) {
    //console.debug('FacetModel#pivot');
    //console.debug(model);
    this.set({ total: model.total }, { silent: true });
    var terms = this.get('terms');
    selectedTerms = _.pluck(terms.selectedTerms(), 'term');
    _.each(model.terms, function(term) { if (_.include(selectedTerms, term.term)) term.selected = true; });
    terms.reset(model.terms, options);
    //this.get('terms').pivot(model.terms, options);
  },

  selected: function() {
    var selected_terms = terms.select(function(term) { return term.get('selected'); });
    return selected_terms.length > 0
  },

  filters: function() {
    console.debug('Facet#filters');
    return this.get('terms').filters();
  }

});
