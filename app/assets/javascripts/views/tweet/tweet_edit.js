ESApp.Views.TweetEdit = Support.CompositeView.extend({
  initialize: function() {
    this.model.on('change:tags', this.renderTags, this);
  },

  events: {
    'keydown #addTag': 'addTag',
    'click .close': 'close'
  },

  close: function() {
    console.debug('leaving');
    this.leave();
  },

  render: function() {
    self = this;
    this.$el.html(JST['tweets/edit']({ tweet: this.model }))
    this.renderTags();
    this.$('.modal').modal();
    this.$('.modal').on('hidden', function() {
      console.debug('leaving');
      $(this).empty();
      self.leave();
    });
    return this;
  },

  renderTags: function() {
    this.$('#tagList').empty();
    var tags = _.map(this.model.get('tags'), function(tag) {
      return '<li><span class="tag">' + tag + '<a class="tag-close">x</a></span></li>';
    });
    
    this.$('#tagList').append(tags.join(''));
  },

  addTag: function(e) {
    if(e.keyCode == 13) {
      var $target = $(e.target);
      this.model.addTag($target.val());
      $target.val('');
    }
  },

  removeTags: function() {
  },

  close: function() {
    this.leave();
  }
});
