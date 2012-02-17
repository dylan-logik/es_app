ESApp.Views.SearchForm = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, "render");
  },

  events: {
    "click #search": "search"
  },

  render: function() {
    this.form = new Backbone.Form({ model: this.model });
    this.renderTemplate();
    this.renderContent();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['search/form']());
  },

  renderContent: function() {
    var self = this;
    var facet_view = new ESApp.Views.FacetsIndex({ collection: this.model.get('facets') });
    var results_view = new ESApp.Views.SearchResults({ collection: this.model.get('results') });

    self.$('#facets').html(facet_view.render().el);
    self.$('#results').html(results_view.render().el);
    self.$('#query').html(this.form.render().el);
    self.$('#query ul').append(JST['search/form_buttons']());
  },

  search: function() {
    this.form.commit();
    this.model.fetch();
    return false;
  }
});
