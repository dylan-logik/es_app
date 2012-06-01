ESApp.Views.SearchForm = Support.CompositeView.extend({

  id: "search",
  className: "search",

  initialize: function(options) {
    _.bindAll(this, "render", "renderContents", "renderFacets", "renderResults");
  },

  events: {
    "click #search": "search",
  },

  render: function() {
    this.$el.html(JST['search/form']());

    this.renderContents(); 
    this.renderFacets();
    this.renderResults();

    Backbone.ModelBinding.bind(this);

    return this;
  },

  renderResults: function() {
    console.debug('renderResults');
    var resultsView = new ESApp.Views.Results({ collection: this.model.results, facets: this.model.facets });
    this.appendChild(resultsView);
    return this;
  },

  renderFacets: function() {
    console.debug('renderFacets');
    var facetView   = new ESApp.Views.FacetsIndex({ collection: this.model.facets });
    this.appendChild(facetView);
    return this;
  },

  renderContents: function() {
    console.debug('renderContents');
    this.$('#took').text(this.model.get('took'));
    this.$('#search-result-total').text(this.model.get('total'));
    return this; 
  },

  search: function() {
    this.model.execute();
    return false;
  }
});
