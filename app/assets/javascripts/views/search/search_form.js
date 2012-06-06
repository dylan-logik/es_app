ESApp.Views.SearchForm = Support.CompositeView.extend({
  id: "search",
  className: "search",

  initialize: function(options) {
    _.bindAll(this, "render", "renderTook", "renderTotal");
    this.model.on('change:took', this.renderTook);
    this.model.on('change:total', this.renderTotal);
  },

  render: function() {
    this.$el.html(JST['search/form']());

    this.renderTook();
    this.renderTotal();
    return this;
  },

  search: function(e) {
    e.preventDefault();
    var query = $(e.target).parent().children('#search-query').val();
    this.model.set('query', query);
    return false;
  }
});
