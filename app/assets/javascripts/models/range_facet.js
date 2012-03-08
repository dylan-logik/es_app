ESApp.Models.RangeFacet = Backbone.Model.extend({
  idAttribute: 'name',

  initialize: function(attrs, options) {
    this.on('facetSelect', this.onRangeSelect, this);

    _.each(attrs.ranges, function(range) {
      if (typeof (range.selected) == 'undefined') range.selected = false;
    });
  },

  onRangeSelect: function(from, selected) {
    selected || (selected = false);
    this.updateRange(from, selected);
    this.trigger('doSearch');
  },

  pivot: function(attrs, options) {
    var ranges = this.get('ranges');
    var selectedRanges = this.selectedRanges();
    console.debug(selectedRanges);
    _.each(attrs.ranges, function(range) {
      console.debug((range.from || 0));
      if (_.include(selectedRanges, (range.from || 0))) range.selected = true;
    });
    this.set({ ranges: attrs.ranges });
    this.trigger('reset');
  },

  updateRange: function(from, selected) {
    _.find(this.get('ranges'), function(r) {
      if (typeof (r.from) == 'undefined' && from == 0) {
        return true;
      } else {
        return r.from == from;
      }
    }).selected = selected; 
  },

  selectedRanges: function() {
    var sr = [];
    var self = this;
    _.each(this.get('ranges'), function(range) {
      if (range.selected) sr.push(self.rangeToString(range));
    });
    return sr;
  },

  filters: function() {
    var field = this.get('name');
    return { 
      "or": _.map(this.selectedRanges(), function(range) {
        var t = {}; t[field] = { "from": range.from, "to": range.to };
        return { "range": t }
      })
    };
  },

  rangeToString: function(range) {
    return (range.from || 0).toString() + '-' + (range.to || 'inf').toString();
  }
});
