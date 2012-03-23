ESApp.Models.TermsFacet = Backbone.Model.extend(
  _.extend({}, ESApp.Mixins.Facet, {

  type: 'terms',
  boolType: 'and',

  isSelectedItem: function(term) {
    return _.include(_.pluck(this.selectedItems(), 'term'), term.term);
  },

  itemFilter: function(term) {
    var field = this.get('name');
    var t = {}; t[field] = term.term;
    return { "term": t };
  },

  chartData: function() {
    var total = _.reduce(_.pluck(this.get('terms'), 'count'),
      function(memo, count) {
        return memo + count;
      }, 0);
    return d = _.map(this.get('terms'), function(term) {
      return [term.term, term.count / total];
    });
  }
}));
