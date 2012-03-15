ESApp.Views.RangeFacet = Support.CompositeView.extend(
  _.extend({}, ESApp.Mixins.FacetView, {
  
  renderContents: function() {
    var self = this;
    this.$('.facet-total').remove();
    var $items = this.$('.facet-items');
    $.each(this.model.get('ranges'), function(index, range) {
      var li = JST['facets/range']({ index: index, rangeId: self.rangeId(range), range: range });
      $items.append(li);
    });
  },

  rangeId: function(range) {
    return this.model.get('name') + '[' + (range.from || 0) + '-' + (range.to || 'inf') + ']';
  }

}));
