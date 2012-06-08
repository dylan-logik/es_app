ESApp.Views.SearchResults = Support.CompositeView.extend({
  id: 'results',
  className: 'results span9',

  initialize: function(options) {
    this.facets = options.facets;
    this.collection.on('reset', this.render, this);
  },

  render: function() {
    console.debug('SearchResults#render');
    this._leaveChildren();
    this.$el.html(JST['search/results']({ hasMore: this.collection.hasMore() }));

    var resultsView = new ESApp.Views.TweetsIndex({ collection: this.collection });
    //var chartsView  = new ESApp.Views.SearchCharts({ collection: this.facets });

    this.renderChild(resultsView);
    //this.renderChild(chartsView);
    
    var $tabs = this.$('.tab-content');
    $tabs.append(resultsView.el);
    //$tabs.append(chartsView.el);
    this.$('#tweets-tab').toggleClass('active');
    return this;
  },
});
