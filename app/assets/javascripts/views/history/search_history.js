ESApp.Views.SearchHistory = Support.CompositeView.extend({
  className: 'span3',

  initialize: function() {
    _.bindAll(this, "render", "renderContents", "add");
    this.collection.on("add", this.add);
    this.collection.on("reset", this.renderContents);
  },

  render: function() {
    console.debug("SearchHistory#render");
    this.$el.html(JST['history/search_history']());
    if (this.collection.length == 0) {
      this.collection.fetch();
    } else {
      this.renderContents();
    }
    return this; 
  },

  renderContents: function() {
    var add = this.add;
    console.debug('SearchHistory#renderContents');
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
