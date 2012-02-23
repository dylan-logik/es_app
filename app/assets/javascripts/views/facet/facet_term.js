ESApp.Views.FacetTerm = Backbone.View.extend({

  tagName: 'li',
  className: 'facet-term',

  initialize: function(options) {
    _.bindAll(this, "render");
  },
  
  events: {
    'click input': 'onSelect'
  },

  onSelect: function() {
    this.model.toggleSelect();
    return this;
  },

  render: function() {
    this.$el.html(JST['facets/term']());
    this.$('label').text(this.model.toString()).attr('for', this.model.cid);
    this.$('.term-facet').attr('checked', this.model.get('selected')).attr('id', this.model.cid);
  },
});
