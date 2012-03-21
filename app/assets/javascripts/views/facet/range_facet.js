ESApp.Views.RangeFacet = Support.CompositeView.extend(
  _.extend({}, ESApp.Mixins.FacetView, {
  
  render: function() {
    this.renderTemplate();
    this.renderName()
    this.removeTotal();
    this.renderContents();
    this.toggleBool(); //maybe move out of render. still need a place to initialize
    return this;
  },

  renderContents: function() {
    var self = this;
    var $items = this.items();
    $.each(this.model.get('ranges'), function(index, range) {
      var li = JST['facets/range']({ index: index, rangeId: self.rangeId(range), range: range });
      $items.append(li);
    });
  },

  rangeId: function(range) {
    return this.model.get('name') + '[' + (range.from || 0) + '-' + (range.to || 'inf') + ']';
  }

}));
