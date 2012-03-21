ESApp.Views.SearchStats = Support.CompositeView.extend({
  className: 'search-stats row',

  render: function() {
    this.$el.html(JST['search/stats']());
    this.$('#avg-retweet-count').text(this.model.get('mean'));
    this.$('#max-retweet-count').text(this.model.get('max'));
  }
});
