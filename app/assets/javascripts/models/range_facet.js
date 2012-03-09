ESApp.Models.RangeFacet = Backbone.Model.extend({
  idAttribute: 'name',

  initialize: function(attrs, options) {
    this.on('facetSelect', this.onRangeSelect, this);
    var i = 0;
    _.each(attrs.ranges, function(range) {
      if (typeof (range.selected) == 'undefined') range.selected = false;
      range.id = i;
      i++;
    });
  },

  onRangeSelect: function(rangeId, selected) {
    selected || (selected = false);
    this.updateRange(rangeId, selected);
    this.trigger('doSearch');
  },

  pivot: function(attrs, options) {
    var ranges = this.get('ranges');
    var self = this;
    var selectedRanges = this.selectedRanges();
    var i = 0;
    _.each(attrs.ranges, function(range) {
      range.id = i;
      _.each(selectedRanges, function(s) {
        if (s.to == range.to && s.from == range.from) {
          range.selected = true;
        } else {
          range.selected = false;
        }
      });
      i++;
    });

    this.set({ ranges: attrs.ranges });
    this.trigger('reset');
  },

  updateRange: function(rangeId, selected) {
    _.find(this.get('ranges'), function(r) {
      return r.id == rangeId;
    }).selected = selected;
  },

  selectedRanges: function() {
    var sr = [];
    _.each(this.get('ranges'), function(range) {
      if (range.selected) sr.push(range);
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
  }
});
