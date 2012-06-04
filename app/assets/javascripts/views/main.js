ESApp.Views.Main = Support.CompositeView.extend({
  id: 'esapp',

  initialize: function() {
    _.bindAll(this, 'render', 'newSearch');
  },

  events: {
    'click #search-execute': 'newSearch'
  },

  render: function() {
    this.$el.html(JST['layout/main']());
  },

  newSearch: function(e) {
    e.preventDefault();
    var query = $(e.target).parent().children('#search-query').val();
    var search = new ESApp.Models.Search({ query: query });
    search.execute();
    ESApp.search_history.add(search));
    return false;
  }
});
