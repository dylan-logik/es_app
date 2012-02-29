ESApp.Views.SearchResults = Backbone.View.extend({

  id: "results",
  className: "results",

  initialize: function(options) {
    _.bindAll(this, "render");
    this.collection.on('reset', this.render);
    this.collection.on('add', this.render);
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

  sync: function(method, model, options) {
    var params = {
      url       : this.url(),
      dataType  : "json",
      type      : "GET",
      data      : this.get('search').request(),
      success   : options.success,
      error     : options.error
    };
    $.ajax(params);
  },

  parse: function(resp) {
    return resp.results;
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
