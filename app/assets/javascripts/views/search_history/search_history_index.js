ESApp.Views.SearchHistory = Support.CompositeView.extend({
  id: 'search-history',
  className: 'row',

  initialize: function() {
    _.bindAll(this, 'render', 'add');
    this.collection.on('add', this.add);
  },

  render: function() {
    this.$el.html(JST['search_history/index']());
    this.renderContents();
    return this; 
  },

  renderContents: function() {
    var $searchHistory = this.$('#search-history');
    var self = this;
    this.collection.each(function(search) {
      var searchView = new ESApp.Views.SearchHistoryItem({ model: search });
      self.renderChild(searchView); 
      $searchHistory.append(searchView.$el);
    });
    return this;
  },

  add: function(search) {
    var searchView = new ESApp.Views.SearchHistoryItem({ model: search });
    this.renderChild(searchView);
    this.$('#search-history').append(searchView.$el); 
    return this;
  }
});
