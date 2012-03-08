ESApp.Models.Facet = Backbone.RelationalModel.extend({
  idAttribute: 'name',

  initialize: function(attributes) {
    this.on('facet-select', function(term, selected) {
      this.onTermSelect(term, selected);
    });

    _.each(attributes.terms, function(term) {
      if (typeof term.selected == 'undefined') {
        term.selected = false;
      }
    });
  },

  onTermSelect: function(term, selected) {
    selected || (selected = false);
    this.updateTerm(term, selected);
    this.get('search').search();
  },

  pivot: function(attributes, options) {
    this.set({ total: attributes.total }, { silent: true });
    var terms = this.get('terms');
    var selectedTerms = this.selectedTerms();
    _.each(attributes.terms, function(term) {
      if (_.include(selectedTerms, term.term)) term.selected = true;
    });
    this.set({ terms: attributes.terms });
    this.trigger('reset');
  },

  selectedTerms: function() {
    var st = [];
    _.each(this.get('terms'), function(term) { if (term.selected) st.push(term.term); });
    return st;
  },

  filters: function() {
    var field = this.get('name');
    return {
      "or": _.map(this.selectedTerms(), function(term) {
        var t = {}; t[field] = term;
        return { "term": t };
      })
    };
  },

  updateTerm: function(term, selected) {
    _.find(this.get('terms'), function(t) { return t.term == term; }).selected = selected;
  }
});
