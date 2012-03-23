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
      if (facet.get('_type') == 'terms') {
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
        data: facet.chartData()
      }]
    });
  }

});
