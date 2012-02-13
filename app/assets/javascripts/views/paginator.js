ESApp.Views.Paginator = Backbone.View.extend({
  events: {
    'click .prev' : 'previous',
    'click .next' : 'next',
  },
  
  initialize: function() {
    _.bindAll(this, 'previous', 'next', 'render');
  },

  render: function() {
    $(this.el).html(JST['layouts/pagination']());
    return this;
  },

  previous: function() {
    this.trigger('previous');
  },

  next: function() {
    this.trigger('next');
  }
});
