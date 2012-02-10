ESApp.Views.TweetsIndex = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, "render");
    this.collection.bind('refresh', this.render);
  },

  events: {
    'click a.prev': 'previous',
    'click a.next': 'next'
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
    this.renderContents();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['tweets/index']({ page_info: { "total": 10, "pages": 10, "prev": false, "next": true, "range": [1,10]}}));
  },

  renderContents: function() {
    var self = this;
    this.collection.each(function(tweet) {
      var row = new ESApp.Views.TweetItem({ model: tweet });
      row.render();
      self.$('tbody').append(row.el);
    });
  }
});
