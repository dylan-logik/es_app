ESApp.Views.SearchForm = Backbone.View.extend({

  id: "search",
  className: "search",

  initialize: function(options) {
    _.bindAll(this, "render");
  },

  events: {
    "click #search": "search",
    "keypress #query": "searchOnEnter",
  },

  render: function() {
    this.form = new Backbone.Form({ model: this.model });

    var facet_view = new ESApp.Views.FacetsIndex({ collection: this.model.get('facets') });
    var results_view = new ESApp.Views.SearchResults({ collection: this.model.get('results') });

    this.$el.append(this.form.render().el);
    this.$el.find('.bbf-form ul').append(JST['search/form_buttons']());
    this.$el.append(facet_view.render().el);
    this.$el.append(results_view.render().el);
    return this;
  },

  search: function() {
    this.form.commit();
    this.model.fetch();
    return false;
  },

  searchOnEnter: function(e) {
    if (e.which == 13) {
      this.search();
    }
  }
});
