ESApp.Views.Search = Support.CompositeView.extend({
  id: 'search',
  className: 'search',
    
  initialize: function(options) {
    _.bindAll(this, 'render', 'renderTook', 'renderTotal');
    this.model.on('change:took', this.renderTook);
    this.model.on('change:total', this.renderTotal);
  },

  render: function() {
    console.debug("Search#render");

    this.$el.html(JST['search/search']());

    var results = new ESApp.Views.SearchResults({ collection: this.model.results, facets: this.model.facets });
    var facets  = new ESApp.Views.FacetsIndex({ collection: this.model.facets });

    this.renderTook()
    this.renderTotal();

    this.appendChild(facets);
    this.appendChild(results);

    return this;
  },

  renderTook: function() {
    this.$('#search-took').text(this.model.get('took'));
    return this;
  },

  renderTotal: function() {
    this.$('search-results-count').text(this.model.get('total'));
    return this;
  },
});
