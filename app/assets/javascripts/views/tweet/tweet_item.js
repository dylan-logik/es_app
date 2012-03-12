ESApp.Views.TweetItem = Support.CompositeView.extend({
  tagName: "tr",
  type: 'tweet_item',

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function() {
    this.renderTemplate();
    this.renderContents();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['tweets/item']());
  },

  renderContents: function() {
    var details = this.$('.details');
    this.$('#user').text(this.model.get('user').name);
    this.$('#content').text(this.model.escape('text'));
    details.attr("href", this.tweetUrl());
  },

  tweetUrl: function() {
    return '#' + this.model.get('id');
  }
});
