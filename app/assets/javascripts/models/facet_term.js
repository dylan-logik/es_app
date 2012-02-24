ESApp.Models.FacetTerm = Backbone.RelationalModel.extend({

  initialize: function(options) {
    options || (options = {});
    this.set('selected', (options.checked || false));
  },

  toggleSelect: function() {
    console.debug('FacetTerm#toggleSelect');
    this.set({ selected: !this.get('selected') });
    console.debug(this.get('selected'));
    this.get('facet').get('search').fetch();

    return this;
  },

  toString: function() {
    return this.get('term') + " (" + this.get('count') + ")";
  }
});
