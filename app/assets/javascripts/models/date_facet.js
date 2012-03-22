ESApp.Models.DateFacet = Backbone.Model.extend({

  idAttribute: 'name',
  type: 'date_histogram',

  initialize: function(attr) {
    this.set({ min: attr.entries[0].time, max: attr.entries[attr.entries.length - 1].time });
  },

  prettyName: function() {
    return _.map(this.escape('name').split(/[\._]/),
      function(part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
    .join(' ');
  }
});
