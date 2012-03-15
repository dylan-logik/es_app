ESApp.Mixins.FacetView = {
  className: 'facet span4',
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  events: {
    'click .facet-item': 'onSelect'
  },

  renderName: function() {
    this.$('.facet-name > strong').text(this.model.prettyName());
  },
  
  renderTotal: function() {
    this.$('.facet-total').text(this.model.escape('total'));
  },

  renderTemplate: function() {
    this.$el.html(JST['facets/item']());
  },

  onSelect: function(e) {
    var $target = $(e.target);
    this.model.trigger('facetSelect', $target.data('item'), $target.is(':checked'));
  }
};
