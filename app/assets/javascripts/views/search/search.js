ESApp.Views.Search = Support.CompositeView.extend({
  id: 'search',
  className: 'search',
    
  initialize: function(options) {
    _.bindAll(this, "render");
  },

  render: function() {
    console.debug("Search#render");
    var form    = new ESApp.Views.SearchForm({ model: this.model });
    var results = new ESApp.Views.SearchResults({ collection: this.model.results, facets: this.model.facets });
    var facets  = new ESApp.Views.FacetsIndex({ collection: this.model.facets });

    var searchHistory = new ESApp.Views.SearchHistory({ collection: ESApp.search_history });

    this.appendChild(form);
    this.appendChild(facets);
    this.appendChild(results);
    this.appendChild(searchHistory);
    return this;
  }
});
