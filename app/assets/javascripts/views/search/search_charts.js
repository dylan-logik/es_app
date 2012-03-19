ESApp.Views.SearchCharts = Support.CompositeView.extend({

  id: 'charts-tab',
  className: 'tab-pane row',

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.on('pivot', this.render);
  },

  render: function() {
    this.$el.html(JST['search/charts']());
    this.renderChart();
    return this;
  },

  renderChart: function() {
    var self = this;
    this.collection.each(function(facet) {
      if (facet.get('_type') == 'date_histogram') {
        self.buildChart(facet);
      }
    });
  },
  
  buildChart: function(facet) {
    var self = this;
    return new Highcharts.StockChart({
      chart: {
        renderTo: self.$('#created_at')[0],
      },
      credits: {
        enabled: false
      },
      yAxis: {
        min: 0
      }, 
      title: {
        text: 'Tweets per minute'
      },
      series: [{
        name: 'Tweets per minute',
        data: self.preprocess(facet.get('entries')),
        tooltip: {
          valueDecimals: 0
        }
      }]
    });
  },

  preprocess: function(data) {
    return _.map(data, function(entry) {
      return [ entry.time, entry.count];
    });
  }
});
