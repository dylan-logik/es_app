ESApp.Views.DateFacetView = Support.CompositeView.extend({
  
  className: 'facet span12',

  initialize: function() {
    _.bindAll(this, 'render', 'onRedraw');
  },

  template: function(facet) {
    return "<div class='facet' id='" + this.model.get('name').replace(/\./g, '-') + "'></div>";
  },

  render: function() {
    this.renderChart();
    this.$el.prepend("<div class='facet-name'><strong>" + this.model.prettyName() + "</stron></div>");
    return this;
  },

  renderChart: function() {
    var self = this;
    var facet = this.model;
    return new Highcharts.StockChart({
      chart: {
        renderTo: self.$el[0],
        margin: 0,
        events: {
          redraw: function() {
            self.onRedraw(this);
          }
        }
      },
      rangeSelector: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      yAxis: {
        min: 0
      },
      series: [{
        name: facet.prettyName(),
        data: self.preprocess(facet.get('entries')),
        tooltip: {
          valueDecimals: 0
        }
      }]
    });
  },

  onRedraw: function(chart) {
    var extremes = chart.xAxis[0].getExtremes();
    this.model.set({ min: extremes.min, max: extremes.max });
    //this.model.trigger('doSearch');
  },

  preprocess: function(data) {
    return _.map(data, function(entry) {
      return [ entry.time, entry.count ];
    });
  }
});
