ESApp.Collections.Facets = Backbone.Collection.extend({
  model: ESApp.Models.Facet,

  reset_facets: function(new_models, options) {
    options || (options = {});
    options['silent'] = true;
    var old_models = [];    
    _.each(this.models, function(model, index) {
      old_terms = model.get('terms').select(function(model) { return !model.get('selected') });
      model.get('terms').remove(old_terms);
      model.get('terms').add(new_models[index].get('terms'));
    });

    this.trigger('reset');
  },

  filters: function() {
    var and = [];
    this.each(function(facet) {
      var f = facet.filters();
      if (f.or.length > 0) {
        and.push(f);
      }
    });

    return { "and": and };
  }
});
