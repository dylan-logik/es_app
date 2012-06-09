ESApp.Collections.SearchHistory = Backbone.Collection.extend({
  model: ESApp.Models.SavedSearch,
  url: '/searches',

  parse: function(response) {
    var response = _.map(response, function(search) {
      return search.search;
    });
    return response;
  }
});
