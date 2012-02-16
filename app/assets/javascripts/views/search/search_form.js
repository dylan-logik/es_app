ESApp.Views.SearchForm = Backbone.View.extend({
  initialize: function(options) {
    _.bindAll(this, "render");
  },

  render: function() {
    this.renderTemplate();
    this.renderContent();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['search/form']());
    Backbone.ModelBinding.bind(this);
  },

  renderContent: function() {
    var self = this;
    var facet_view = new ESApp.Views.FacetsIndex({ collection: this.model.get('facets') });
    var results_view = new ESApp.Views.SearchResults({ collection: this.model.get('results') });
    self.$('#facets').html(facet_view.render().el);
    self.$('#results').html(results_view.render().el);
  }
});
