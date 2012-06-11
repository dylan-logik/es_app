ESApp.Models.DateFacet = Backbone.Model.extend({
  type: 'date',
 
  initialize: function(options) {
    console.debug("DateFacet#initialize");
    options['selected'] || (options['selected'] = false)
    //this.on('change:min', this.doSearch, this);
    //this.on('change:max', this.doSearch, this);
    this.on('change:selected', this.doSearch, this);
    this.set(options, { silent: true });
  },

  pivot: function(attrs, options) {
    if(!this.get('selected')) {
      console.debug("DateFacet#pivot");
      attrs['selected'] = false;
      this.set(attrs, { silent: true });
    }
  },

  locked: function() {
    return false;
  },

  filters: function() {
    var toFrom = { "from": this.get('min').toFixed(0), "to": this.get('max').toFixed(0) };
    var filter = {}; filter[this.get('name')] = toFrom;
    return { "numeric_range":  filter }
  },

  prettyName: function() {
    return _.map(this.escape('name').split(/[\._]/),
      function(part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
    .join(' ');
  },

  doSearch: function() {
    console.debug('DateFacet#doSearch');
    this.trigger('doSearch');
  }
});
