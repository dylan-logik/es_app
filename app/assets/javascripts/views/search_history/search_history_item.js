ESApp.Views.SearchHistoryItem = Support.CompositeView.extend({
  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function() {
    this.$el.html(JST['search_history/item']());
    this.renderContents();
    return this;
  },

  renderContents: function() {
    this.$('#query').text(this.model.get('query'));
    return this;
  },
});
