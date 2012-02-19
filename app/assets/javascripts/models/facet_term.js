ESApp.Models.FacetTerm = Backbone.RelationalModel.extend({

  initialize: function(options) {
    options || (options = {});
    this.set('selected', (options.checked || false));
  },

  toString: function() {
    return this.get('term') + " (" + this.get('count') + ")";
  }
});
