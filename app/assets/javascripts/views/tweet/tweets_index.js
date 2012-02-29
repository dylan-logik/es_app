ESApp.Views.SearchResults = Backbone.View.extend({

  id: "results",
  className: "results",

  initialize: function(options) {
    _.bindAll(this, "render", "add");
    this.collection.on('reset', this.render);
    this.collection.on('add', this.add);
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

    var opts = { offset: '100%' };
    var self = this;
    this.$('#waypoint').waypoint(function(e, direction) {
      if (direction == 'down') {
        self.next();
      }
    }, opts);

    return this;
  },

  add: function(model) {
    var row = new ESApp.Views.TweetItem({ model: model });
    this.$('tbody').append(row.render().el);
  },

  renderTemplate: function() {
    this.$el.html(JST['tweets/index']());
    this.$el.append(JST['layouts/pagination']({ page_info: this.collection.pageInfo() }));
  },

  renderContents: function() {
    var self = this;
    this.collection.each(function(tweet) {
      var row = new ESApp.Views.TweetItem({ model: tweet });
      self.$('tbody').append(row.render().el);
    });
  }
});
