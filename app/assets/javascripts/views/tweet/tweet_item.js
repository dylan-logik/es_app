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
    this.$('#user').text(this.model.get('user').name);
    this.$('#content').text(this.model.escape('text'));
    this.$('.time-stamp').text($.format.date(this.model.get('created_at'), 'ddd MMMM dd, yyyy hh:mma')); 
    this.$('.screen_name').text('@' + this.model.get('user').screen_name);
    this.$('.collapse > p').text(this.model.cid);
    var collapseId = 'collapse' + this.model.cid;
    this.$('.hentry').attr('href', '#' + collapseId); 
    this.$('.collapse').attr('id', collapseId).collapse({
      toggle: false
    });
  },

  tweetUrl: function() {
    return '#' + this.model.get('id');
  }
});
