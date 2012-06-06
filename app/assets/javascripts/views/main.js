ESApp.Views.Main = Support.CompositeView.extend({
  id: 'esapp',

  initialize: function() {
    _.bindAll(this, 'render', 'renderSearch', 'renderSearchHistory', 'newSearch');
  },

  events: {
    'click #search-execute': 'newSearch'
  },

  render: function() {
    this.$el.html(JST['layouts/main']());
    // Render the first default search to bootstrap the view but don't want the default search in the search history
    // Probably want to re-think this. It will keep popping models if re-rendering the view
    this.renderSearch(this.collection.pop());
    //this.renderSearchHistory();
    return this;
  },

  renderSearch: function(search) {
    // Cleanly leave the previous search view if it exists
    // This is what SwappingRouter#swap does
    if(this.searchView) {
      this.searchView.leave();
    }

    this.searchView = new ESApp.Views.Search({ model: search });
    this.appendChild(this.searchView);

    return this;
  },

  renderSearchHistory: function() {
    var view = new ESApp.Views.SearchHistory({ collection: this.collection })
    this.appendChild(view);
    return this;
  },

  newSearch: function(e) {
    e.preventDefault();
    var query = $(e.target).parent().children('#search-query').val();
    // Can't pass the query through the initializer because the bootstrap mechanism
    var search = new ESApp.Models.Search();
    search.set("query", query); // this will execute the search
    this.renderSearch(search);
    this.collection.add(search);
    return false;
  }
});
