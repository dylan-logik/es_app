ESApp.Collections.FacetTerms = Backbone.Collection.extend({
  model: ESApp.Models.FacetTerm,

  pivot: function(terms, options) {
    console.debug(terms);
    var selectedTerms = [];
    this.each(function(term) { if(term.get('selected')) return selectedTerms.push(term.get('term')); });
    _.each(terms, function(term) { if (_.include(selectedTerms, term.term)) term.selected = true; });
    //this.reset(terms, options);
  },

  selectedTerms: function() {
    return this.select(function(term) { return term.get('selected'); });
  },

  filters: function() {
    var field = this.facet.get('name');
    var selectedTerms = this.selectedTerms();
    console.debug(selectedTerms);
    return {
      "or": _.map(selectedTerms, function(selected) {
        var t = {};
        t[field] = selected.get('term');
        return { "term": t };
      })
    };
  }
});
