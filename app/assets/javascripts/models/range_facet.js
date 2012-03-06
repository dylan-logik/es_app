ESApp.Models.RangeFacet = Backbone.Model.extend({
  idAttribute: 'name',

  initialize: function(attrs, options) {
    console.debug(attrs);
  },

  selectedRanges: function() {
    var sr = [];
    _.each(this.get('ranges'), function(range) {
      if (range.selected) sr.push($.map(range
    });
  },

  filters: function() {
    var field = this.get('name');
    return { 
      "or": _.map(this.selectedRanges(), function(range) {
        var t = {}; t[field] = { "from": range.from, "to": range.to };
        return { "range": t }
      })
    };
  }
});
