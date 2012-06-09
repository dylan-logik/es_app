ESApp.Views.SearchForm = Support.CompositeView.extend({
  id: "search",
  className: "search",

  initialize: function(options) {
    _.bindAll(this, "render", "renderTook", "renderTotal", "savedSearchAlert");
    this.model.on('change:took', this.renderTook);
    this.model.on('change:total', this.renderTotal);
    this.model.search_history.on('add', this.savedSearchAlert);
  },

  events: {
    "click #search-execute": "search",
    "click #save-search": "saveSearch"
  },

  savedSearchAlert: function() {
    var al = $(JST['alerts/saved_search_success']());
    console.debug(al);
    this.$('#alerts').prepend(al);
    window.setTimeout(function() { al.alert('close'); }, 5000); 
    return this;
  },

  renderTook: function() {
    this.$('#search-took').text(this.model.get('took'));
    return this;
  },

  renderTotal: function() {
    this.$('#search-results-count').text(this.model.get('total'));
    return this;
  },

  render: function() {
    this.$el.html(JST['search/form']());

    this.renderTook();
    this.renderTotal();
    return this;
  },

  search: function(e) {
    e.preventDefault();
    var query = this.selectQuery(e);
    this.model.set('query', query);
    return false;
  },
  
  saveSearch: function(e) {
    console.debug("SearchForm#saveSearch");
    e.preventDefault();
    var query = this.selectQuery(e);
    if(!_.isEmpty(query)) {
      this.model.saveSearch();
    }
  },

  selectQuery: function(e) {
    return $(e.target).parent().children('#search-query').val();
  }
});
