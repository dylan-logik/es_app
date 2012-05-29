ESApp.Views.TweetEdit = Backbone.View.extend({
  id: "tweet-modal",
  className: "modal",

  render: function() {
    this.$el.html(JST['tweets/edit']({ tweet: this.model })).modal();
    this.$('#addTag').quickTag({
      allowedTags: 10,
      limitation: 20,
      tagClass: "label"
    });
    return this;
  }
});
