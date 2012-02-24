ESApp.Models.Facet = Backbone.RelationalModel.extend({
  idAttribute: 'name',

  initialize: function(attributes) {
    if (typeof attributes.selected == 'undefined') {
      this.set({ selected: false });
    }
  },
 
  pivot: function(model, options) {
    this.set({ total: model.total }, { silent: true });
    var terms = this.get('terms');
    _.each(model.terms, function(term) { if (_.include(this.selectedTerms(), term.term)) term.selected = true; });
    terms.reset(model.terms, options);
  },

  selected: function() {
    var selected_terms = terms.select(function(term) { return term.get('selected'); });
    return selected_terms.length > 0
  },

  selectedTerms: function() {
    _.select(this.get('terms'), function(term) {
      return term.selected;
    });
  },

  filters: function() {
    console.debug('Facet#filters');
    return this.get('terms').filters();
  }

});
