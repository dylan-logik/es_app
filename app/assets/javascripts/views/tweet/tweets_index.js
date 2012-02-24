ESApp.Views.SearchResults = Backbone.View.extend({

  id: "results",
  className: "results",

  initialize: function(options) {
    _.bindAll(this, "render");
    this.collection.bind('reset', this.render);
    this.collection.bind('fetching', this.fetching);
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

  fetching: function() {
    $(this.el).html('Fetching...');
  },

  render: function() {
    this.renderTemplate();
    this.renderContents();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['tweets/index']({ page_info: this.collection.pageInfo() }));
  },

  renderContents: function() {
    var self = this;
    this.collection.each(function(tweet) {
      var row = new ESApp.Views.TweetItem({ model: tweet });
      self.$('tbody').append(row.render().el);
    });
  }
});