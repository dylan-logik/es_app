ESApp.Views.RangeFacet = Backbone.View.extend({
  
  tagName: 'td',
  className: 'range-facet',

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('reset', this.render);
  },

  events: {
    'click .range-facet': 'onSelect'
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

    var rangeList = this.$('.terms');
    _.each(this.model.get('ranges'), function(range) {
      var li = JST['facets/range']({ rangeId: self.rangeId(range), range: range });
      rangeList.append(li);
    });
  },

  onSelect: function(e) {
    var target = $(e.target);
    this.model.trigger('facetSelect', target.data('range'), target.is(':checked'));
  },

  rangeId: function(range) {
    return this.model.get('name') + '[' + (range.from || 0) + '-' + (range.to || 'inf') + ']';
  }

});
