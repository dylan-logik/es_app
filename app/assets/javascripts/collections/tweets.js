ESApp.Collections.Tweets = Backbone.Collection.extend({
  model: ESApp.Models.Tweet,
  url: '/tweets'
});
