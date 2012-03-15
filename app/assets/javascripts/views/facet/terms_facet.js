ESApp.Views.TermsFacet = Support.CompositeView.extend(
  _.extend({}, ESApp.Mixins.FacetView, {

  renderContents: function() {
    var self = this;
    this.$('.facet-total').text(this.model.escape('total'));
    var $items = this.$('.facet-items');
    $.each(this.model.get('terms'), function(index, term) {
      var li = JST['facets/term']({ index: index, termId: self.termId(term), term: term });
      $items.append(li);
    });
  },

  termId: function(term) {
    return this.model.get('name').replace('.', '-') + '-' + term.term;
  }
}));
