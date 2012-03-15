ESApp.Views.SearchResults = Support.CompositeView.extend({

  id: "results",
  className: "results row",

  initialize: function(options) {
    _.bindAll(this, "render", "add");
    this.collection.on('reset', this.render);
    this.collection.on('add', this.add);
  },

  events: {
    'click button.prev': 'previous',
    'click button.next': 'next'
  },

  previous: function() {
    this.collection.previousPage();
    return false;
  },

  next: function() {
    this.collection.nextPage();
    return false;
  },

  render: function() {
    this.renderTemplate();
    this._leaveChildren();
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
