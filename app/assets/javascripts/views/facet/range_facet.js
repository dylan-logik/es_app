ESApp.Views.RangeFacet = Support.CompositeView.extend({
  
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
    this.$el.html(JST['facets/item']());
    this.renderContents();
    return this;
  },

  renderContents: function() {
    var self = this;
    this.$('.facet-name > strong').text(this.model.prettyName());
    this.$('.facet-total').remove();

    var rangeList = this.$('.facet-terms');
    var i = 0;
    _.each(this.model.get('ranges'), function(range) {
      var rangeId = self.rangeId(range);
      var li = JST['facets/range']({ rangeId: rangeId, range: range });
      if (range.selected) {
        $(li).children('input').prop("checked", true);
      }
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
