ESApp.Collections.FacetTerms = Backbone.Collection.extend({
  model: ESApp.Models.FacetTerm,

  filters: function() {
    var field = this.facet.get('name');
    return {
      "or": _.map(this.select(function(term) { return term.get('selected'); }), function(selected) {
        var t = {};
        t[field] = selected.get('term');
        return { "term": t };
      })
    };
  }
});
