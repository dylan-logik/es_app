ESApp.Mixins.FacetView = {
  className: 'facet span4',
  
  initialize: function() {
    _.bindAll(this, 'render', 'toggleBool');
    this.model.bind('change', this.render);
    this.model.bind('change:boolType', this.toggleBool);
  },

  events: {
    'click .facet-item': 'onSelect',
    'click .bool-btn': 'onToggleBool'
  },

  renderName: function() {
    this.$('.facet-name > strong').text(this.model.prettyName());
  },
 
  renderTotal: function() {
    this.$('.facet-total').text(this.model.escape('total'));
  },

  removeTotal: function() {
    this.$('.facet-total').remove();
  },

  renderTemplate: function() {
    this.$el.html(JST['facets/item']());
  },

  items: function() {
    return this.$('.facet-items');
  },

  toggleBool: function() {
    console.debug(this);
    this.$('.btn-group > #booltype-btn-' + this.model.boolType).button('toggle');
  },

  onSelect: function(e) {
    var $target = $(e.target);
    this.model.trigger('facetSelect', $target.data('item'), $target.is(':checked'));
  },

  onToggleBool: function(e) {
    var $target = $(e.target);
    this.model.trigger('toggleBool', $target.data('bool'));
  }
};
