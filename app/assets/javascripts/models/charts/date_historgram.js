ESApp.Models.DateHistorgram = Backbone.Model.extend({

  idAttribute: 'name',
  type: 'date_histogram',
  boolType: 'or',

  initialize: function(attr) {
    this.set({ global_min: attr.entries[0].time, min: attr.entries[0].time, global_max: attr.entries[attr.entries.length - 1].time, max: attr.entries[attr.entries.length - 1].time });
  },

  locked: function() {
    return true; 
  },

  pivot: function(attr, options) {
    this.set(attr);
  },

  onSelect: function(extremes) {
    if (extremes.min != this.get('min') || extremes.max != this.get('max')) {
      this.set({ min: extremes.min, max: extremes.max }, { silent: true });
      this.trigger('doSearch');
    }
  },

  filters: function() {
    if (this.get('min') != this.get('global_min') || this.get('max') != this.get('global_max') ) {
      var field = this.get('name');
      var t = {}; t[field] = { "from": this.get('min').toFixed(0), "to": this.get('max').toFixed(0) };
      return { "or": [{ "numeric_range": t }] };
    } else {
      return { "or": [] };
    }
  },

  prettyName: function() {
    return _.map(this.escape('name').split(/[\._]/),
      function(part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
    .join(' ');
  },

  chartData: function() {
    return _.map(this.get('entries'), function(entry) {
      return [entry.time, entry.count];
    });
  }
});
