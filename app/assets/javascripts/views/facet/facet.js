ESApp.Mixins.FacetView = {
  className: 'facet row',
  
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('change', this.render);
  },

  events: {
    'click .facet-item': 'onSelect'
  },

  render: function() {
    this.$el.html(JST['facets/item']());
    this.$('.facet-name > strong').text(this.model.prettyName());
    this.renderContents();
    return this;
  },

  onSelect: function(e) {
    var $target = $(e.target);
    this.model.trigger('facetSelect', target.data('item'), target.is(':checked'));
  }
};
