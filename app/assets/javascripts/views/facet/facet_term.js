ESApp.Views.FacetTerm = Backbone.View.extend({

  tagName: 'li',
  className: 'facet-term',

  initialize: function(options) {
    _.bindAll(this, "render");
  },

  render: function() {
    this.$el.html(JST['facets/term']());
    this.$('label').text(this.model.get('term') + " (" +this.model.get('count') + ")").attr('for', this.model.cid);
    this.$('.term-facet').attr('checked', this.model.get('selected')).attr('id', this.model.cid);
    Backbone.ModelBinding.bind(this, { checkbox: "modelAttr" });
  }
});
