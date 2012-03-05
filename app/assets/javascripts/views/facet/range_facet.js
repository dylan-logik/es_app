ESApp.Views.RangeFacet = Backbone.View.extend({
  
  tagName: 'td',
  className: 'range-facet',

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('reset', this.render);
  },

  render: function() {
    this.renderTemplate();
    this.renderContents();
    return this;
  },

  renderTemplate: function() {
    this.$el.html(JST['facets/item']());
  },

  renderContents: function() {
    var self = this;
    this.$('.name').text(this.model.escape('name'));
    this.$('.total').text(this.model.escape('total'));

    var facetName = this.model.get('name');
    var ranges = this.$('.ranges');
    _.each(this.model.get('ranges'), function(range) {
      var li = JST['facets/range']({ rangeId: facetName + '[' + 
  },

});
