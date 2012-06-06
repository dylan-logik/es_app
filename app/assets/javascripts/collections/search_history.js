ESApp.Collections.SearchHistory = Backbone.Collection.extend({
  url: '/searches/history',
  model: ESApp.Models.Search,
});
