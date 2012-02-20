ESApp.Models.FacetTerm = Backbone.RelationalModel.extend({

  initialize: function(options) {
    options || (options = {});
    this.set('selected', (options.checked || false));
  },

  submit: function() {
    this.get('facet').get('search').fetch();
    return this;
  },

  toString: function() {
    return this.get('term') + " (" + this.get('count') + ")";
  }
});
