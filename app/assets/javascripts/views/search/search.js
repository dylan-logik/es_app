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

    // NOTE: Order matters for layout
    this.appendChild(form);
    this.appendChild(facets);
    this.appendChild(results);

    return this;
  }
});
