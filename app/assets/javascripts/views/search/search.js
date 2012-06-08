ESApp.Views.Search = Support.CompositeView.extend({
  id: 'search',
  className: 'search',
    
  initialize: function(options) {
    _.bindAll(this, "render");
  },

  render: function() {
    console.debug("Search#render");
    var form          = new ESApp.Views.SearchForm({ model: this.model });
    var facets        = new ESApp.Views.FacetsIndex({ collection: this.model.facets });
    var searchHistory = new ESApp.Views.SearchHistory({ collection: this.model.search_history });
    var results       = new ESApp.Views.SearchResults({ collection: this.model.results, facets: this.model.facets });


    this.appendChild(form);
    this.appendChild(facets);
    this.$el.append("<div id='bottom' class='row'></div>");
    this.renderChild(results);
    this.renderChild(searchHistory);
    this.$('#bottom').append(results.$el);
    this.$('#bottom').append(searchHistory.$el); 
    return this;
  }
});
