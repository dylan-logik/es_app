ESApp.Views.TermsFacet= Support.CompositeView.extend({

  tagName: "td",
  className: "facet-item",
  type: 'terms',

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('reset', this.render);
  },

  events: {
    'click .term-facet': 'onSelect'
  },

  render: function() {
    this.$el.html(JST['facets/item']());
    this.renderContents();
    this.renderChecks();
    return this;
  },

  renderContents: function() {
    var self = this;
    this.$('.name').text(this.model.escape('name'));
    this.$('.total').text(this.model.escape('total'));

    var facetName = this.model.get('name').replace('.', '-');
    var $terms = this.$('.terms');
    $.each(this.model.get('terms'), function(index, term) {
      var termId = facetName + '-' + term.term;
      var li = JST['facets/term']({ termId: termId, term: term });
      $terms.append(li);
    });
  },

  renderChecks: function() {
    var self = this;
    var selectedTerms = this.model.selectedTerms();
    var facetName = this.model.get('name').replace('.', '-');
    _.each(selectedTerms, function(term) {
      var termId = facetName + '-' + term
      var t = self.$("input[data-term='" + term + "']");
      console.debug(t);
      t.prop("checked", true);
    });
  },

  onSelect: function(e) {
    var target = $(e.target);
    this.model.trigger('facetSelect', target.data('term'), target.is(':checked'));
  }
});
