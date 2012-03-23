ESApp.Models.DateFacet = Backbone.Model.extend({

  idAttribute: 'name',
  type: 'date_histogram',
  boolType: 'or',

  initialize: function(attr) {
    this.set({ min: attr.entries[0].time, max: attr.entries[attr.entries.length - 1].time });
  },

  locked: function() {
    return false;
  },

  pivot: function(attr, options) {
    this.set(attr);
  },

  onSelect: function(extremes) {
    console.debug('onSelect');
    console.debug("from: " + extremes.min + " max: " + extremes.max);
    console.debug("from: " + this.get('min') + " max: " + this.get('max'));
    this.set({ min: extremes.min, max: extremes.max }, { silent: true });
    this.trigger('doSearch');
  },

  filters: function() {
    console.debug('filters');
    console.debug("from: " + this.get('min') + " max: " + this.get('max'));
    var field = this.get('name');
    var t = {}; t[field] = { "from": this.get('min').toFixed(0), "to": this.get('max').toFixed(0) };
    return { "or": [{ "numeric_range": t }] }
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
