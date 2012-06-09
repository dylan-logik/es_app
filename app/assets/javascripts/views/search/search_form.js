ESApp.Views.SearchForm = Support.CompositeView.extend({
  id: "search",
  className: "search",

  initialize: function(options) {
    _.bindAll(this, "render", "renderTook", "renderTotal", "renderSortMenu", "savedSearchAlert", "sort");
    this.model.on('change:took', this.renderTook);
    this.model.on('change:total', this.renderTotal);
    this.model.search_history.on('add', this.savedSearchAlert);
  },

  events: {
    "click #search-execute": "search",
    "click #save-search": "saveSearch",
    "click .sort-search-item": "sort"
  },

  sort: function(e) {
    var $target = $(e.target);
    console.debug($target.text());
    this.model.set("sort", this.model.sortMap[$target.text()]);
    this.$('#sort-search-value').text($target.text());
  },

  savedSearchAlert: function() {
    var al = $(JST['alerts/saved_search_success']());
    this.$('#alerts').prepend(al);
    window.setTimeout(function() { al.alert('close'); }, 2000); 
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

  renderSortMenu: function() {
    var sortValues = _.keys(this.model.sortMap).map(function(key) {
      return "<li><a class='sort-search-item'>" + key + "</a></li>";
    });

    this.$('#search-sort-menu').append(sortValues.join(''));
    return this;
  },

  render: function() {
    this.$el.html(JST['search/form']());

    this.renderTook();
    this.renderTotal();
    this.renderSortMenu();
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
