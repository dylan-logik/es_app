ESApp.Views.FacetsIndex = Backbone.View.extend({

  id: "facets",
  className: "facets",
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
  },

  render: function() {
    this.renderTemplate();
    this.renderContents();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['facets/index']());
  },

  renderContents: function() {
    var self = this;
    this.collection.each(function(facet) {
      var facetItem = new ESApp.Views[self.facetToString(facet)]({ model: facet });
      self.$('tbody > tr').append(facetItem.render().el);
    });
  },

  facetToString: function(facet) {
    return $.map(facet.get('_type').split('_'), function(part) { return part.charAt(0).toUpperCase() + part.slice(1); }).join('') + 'Facet';
  }
});
