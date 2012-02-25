ESApp.Views.TweetItem = Backbone.View.extend({
  tagName: "tr",

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
    //details.data('id', this.model.id);
  },

  tweetUrl: function() {
    return '#' + this.model.get('id');
  }
});
