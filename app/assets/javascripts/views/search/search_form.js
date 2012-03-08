ESApp.Views.SearchForm = Backbone.View.extend({

  id: "search",
  className: "search",

  initialize: function(options) {
    _.bindAll(this, "render");
  },

  events: {
    "click #search": "search",
    "keyup #query": "searchOnEnter",
  },

  render: function() {
    this.$el.html(JST['search/form']());

    var facet_view = new ESApp.Views.FacetsIndex({ collection: this.model.get('facets') });
    var results_view = new ESApp.Views.SearchResults({ collection: this.model.get('results') });

    this.$el.append(facet_view.render().el);
    this.$el.append(results_view.render().el);

    Backbone.ModelBinding.bind(this);

    return this;
  },

  search: function() {
    this.model.search();
    return false;
  },

  searchOnEnter: function(e) {
    if (e.which == 13) {
      this.search();
    }
  }
});
