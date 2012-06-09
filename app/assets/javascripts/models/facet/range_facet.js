ESApp.Models.RangeFacet = Backbone.Model.extend(
  _.extend({}, ESApp.Mixins.Facet, {

  idAttribute: 'name',
  type: 'ranges',
  boolType: 'or',

  isSelectedItem: function(range) {
    var o = _.find(this.selectedItems(), function(r) {
      return (r.to == range.to && r.from == range.from);
    });
    return typeof(o) != 'undefined';
  },
  
  itemFilter: function(range) {
    var field = this.get('name');
    var t = {}; t[field] = { "from": range.from, "to": range.to };
    return { "range": t }
  },
}));
