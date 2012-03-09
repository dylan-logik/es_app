ESApp.Views.TermsFacet= Support.CompositeView.extend({

  tagName: "td",
  className: "facet-item",

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('reset', this.render);
  },

  events: {
    'click .term-facet': 'onSelect'
  },

  render: function() {
    console.debug("TERMS " + this.cid);
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
    var terms = this.$('.terms');
    _.each(this.model.get('terms'), function(term) {
      var li = JST['facets/term']({ termId: facetName + "[" + term.term + "]", term: term });
      terms.append(li);
    });
  },

  onSelect: function(e) {
    var target = $(e.target);
    this.model.trigger('facet-select', target.data('term'), target.is(':checked'));
  }
});
