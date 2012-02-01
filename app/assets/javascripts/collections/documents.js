ESApp.Collections.Documents = Backbone.Collection.extend({
  model: ESApp.Models.Document,
  url: '/documents'
});
