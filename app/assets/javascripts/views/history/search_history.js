ESApp.Views.SearchHistory = Support.CompositeView.extend({
  className: 'span3',

  initialize: function() {
    _.bindAll(this, "render", "renderContents", "add");
    this.collection.on("add", this.add);
  },

  render: function() {
    this.$el.html(JST['history/search_history']());
    this.renderContents();
    return this; 
  },

  renderContents: function() {
    var add = this.add;
    this.collection.each(function(savedSearch) {
      add(savedSearch);
    }); 
    return this;
  },

  add: function(model) {
    var savedSearchView = new ESApp.Views.SavedSearch({ model: model });
    this.renderChild(savedSearchView);
    this.$('#search-history').append(savedSearchView.$el); 
  }
});
