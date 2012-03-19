ESApp.Views.SearchResults = Support.CompositeView.extend({
  id: 'tweets-tab',
  className: 'tab-pane row',

  initialize: function(options) {
    _.bindAll(this, 'render', 'add');
    this.collection.on('reset', this.render);
    this.collection.on('add', this.add);
  },

  events: {
    'click button.next': 'next'
  },

  next: function() {
    this.collection.nextPage();
  },

  render: function() {
    this._leaveChildren();
    this.renderTemplate();
    this.renderContents();
    return this;
  },

  add: function(model) {
    var tweetItem = new ESApp.Views.TweetItem({ model: model });
    this.renderChild(tweetItem);
    this.$('#tweets-list').append(tweetItem.el);
    return this;
  },

  renderTemplate: function() {
    this.$el.html(JST['tweets/index']());
  },

  renderContents: function() {
    var self = this;
    this.collection.each(function(tweet) {
      var tweetItem = new ESApp.Views.TweetItem({ model: tweet });
      self.renderChild(tweetItem);
      self.$('#tweets-list').append(tweetItem.el);
    });
  }
});
