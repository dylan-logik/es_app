ESApp.Models.TermsFacet = Backbone.Model.extend(
  _.extend({}, ESApp.Mixins.Facet, {

  type: 'terms',
  boolType: 'or',

  isSelectedItem: function(term) {
    return _.include(_.pluck(this.selectedItems(), 'term'), term.term);
  },

  itemFilter: function(term) {
    var field = this.get('name');
    var t = {}; t[field] = term.term;
    return { "term": t };
  }
}));
