ESApp.Models.FacetTerm = Backbone.RelationalModel.extend({
  toString: function() {
    return this.get('term') + " (" + this.get('count') + ")";
  }
});
