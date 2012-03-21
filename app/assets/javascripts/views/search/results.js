ESApp.Views.Results = Support.CompositeView.extend({
  id: 'results',
  className: 'results row',

  initialize: function(options) {
    this.facets = options.facets;
  },

  render: function() {
    this.$el.html(JST['search/results']());

    var resultsView = new ESApp.Views.SearchResults({ collection: this.collection });
    var chartsView  = new ESApp.Views.SearchCharts({ collection: this.facets });

    this.renderChild(resultsView);
    this.renderChild(chartsView);
    
    var $tabs = this.$('.tab-content');
    $tabs.append(resultsView.el);
    $tabs.append(chartsView.el);
    this.$('#tweets-tab').toggleClass('active');
    return this;
  }
});
