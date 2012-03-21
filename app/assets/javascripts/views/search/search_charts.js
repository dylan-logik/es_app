ESApp.Views.SearchCharts = Support.CompositeView.extend({

  id: 'charts-tab',
  className: 'tab-pane row',

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.on('pivot', this.render);
  },

  render: function() {
    //this.$el.html(JST['search/charts']());
    this.renderChart();
    return this;
  },

  renderChart: function() {
    var self = this;
    this.collection.each(function(facet) {
      if (facet.get('_type') == 'date_histogram') {
        self.$el.append("<div class='span12' id='" + facet.get('name').replace(/\./g, '-') + "'></div>");
        self.buildChart(facet);
      } else if (facet.get('_type') == 'terms') {
        self.$el.append("<div class='span6' id='" + facet.get('name').replace(/\./g, '-') + "'></div>");
        self.buildPie(facet);
      }
    });
  },
 
  buildPie: function(facet) {
    return new Highcharts.Chart({
      chart: {
        renderTo: this.$('#'+facet.get('name').replace(/\./g, '-'))[0],
        plotBackgroundColor: null,
        plotBorderWidth: null
      },
      title: {
        text: facet.get('name')
      },
      plotOptions: {
        pie: {
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            color: '#000000',
            connectorColor: '#000000',
            formatter: function() {
              return '<b>'+ this.point.name +'</b>: '+ this.percentage.toFixed(2) +' %';
            }
          }
        }
      },
      tooltip: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: facet.get('name'),
        data: this.preprocessTerms(facet.get('terms'), facet.get('total'))
      }]
    });
  },
 
  buildChart: function(facet) {
    var self = this;
    return new Highcharts.StockChart({
      chart: {
        renderTo: self.$('#'+facet.get('name').replace('.', '-'))[0],
        events: {
          redraw: function() {
            console.debug(this.xAxis[0].getExtremes());
          }
        }
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
      return [ entry.time, entry.count ];
    });
  },

  preprocessTerms: function(terms) {
    var total = _.reduce(_.pluck(terms, 'count'), 
        function(memo, count) {
          return memo + count;
        }, 0);
    return d = _.map(terms, function(term) {
      return [term.term, term.count / total];
    });
  }

});
