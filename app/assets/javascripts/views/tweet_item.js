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
    var user = this.model.attributes.user;
    this.$('#user').text(user.name);
    this.$('#content').text(this.model.escape('text'));
  }
});
