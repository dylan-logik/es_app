ESApp.Views.Main = Support.CompositeView.extend({
  id: 'esapp',

  initialize: function() {
    _.bindAll(this, 'render', 'renderSearch', 'renderSearchHistory', 'newSearch');
  },

  events: {
    'click #search-execute': 'newSearch'
  },

  render: function() {
    console.debug('Main#render');
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
    console.debug(this.searchView);
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
    console.debug('Main#newSearch');
    search.set("query", query); // this will execute the search
    console.debug(search);
    this.collection.add(search);
    this.renderSearch(search);
    return false;
  }
});
