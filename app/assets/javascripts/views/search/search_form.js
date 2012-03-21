ESApp.Views.SearchForm = Support.CompositeView.extend({

  id: "search",
  className: "search",

  initialize: function(options) {
    _.bindAll(this, "render");
  },

  events: {
    "click #search": "search",
  },

  render: function() {
    this.$el.html(JST['search/form']());

    var facetView = new ESApp.Views.FacetsIndex({ collection: this.model.facets });
    var resultsView = new ESApp.Views.SearchResults({ collection: this.model.results });

    this.renderChild(facetView);
    this.renderChild(resultsView);

    this.$el.append(facetView.el);
    this.$el.append(resultsView.el);

    Backbone.ModelBinding.bind(this);

    return this;
  },

  search: function() {
    this.model.search();
    return false;
  }
});
