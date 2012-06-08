ESApp.Views.SavedSearch = Support.CompositeView.extend({
  tagName: 'li',
  
  initialize: function() {
    _.bindAll(this, "render", "renderContents");
  },

  render: function() {
    this.$el.html(JST['history/saved_search']());
    this.renderContents();
    return this;
  },

  renderContents: function() {
    this.$('.saved-search-query').text(this.model.get('query'));
    return this;
  }
});
