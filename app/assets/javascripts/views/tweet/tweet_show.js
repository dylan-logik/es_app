ESApp.Views.TweetShow = Backbone.View.extend({
  id: "tweet",
  className: "tweet",

  initialize: function() {
    _.bindAll(this, 'render');
  },

  render: function() {
    this.$el.html(JST['tweets/show']({ tweet: this.model }));
    return this;
  }
});
