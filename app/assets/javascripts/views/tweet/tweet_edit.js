ESApp.Views.TweetEdit = Support.CompositeView.extend({
  initialize: function() {
    _.bindAll(this, "render", "close");
    this.model.on('change:tags', this.renderTags, this);
  },

  events: {
    'keydown #addTag': 'addTag',
    'click .close': 'close',
    'click .tag-close': 'removeTag',
    'click #save-tags': 'saveTags',
  },

  close: function() {
    console.debug('leaving');
    this.$el.empty();
    this.leave();
  },

  render: function() {
    this.$el.html(JST['tweets/edit']({ tweet: this.model }))

    this.renderTags();

    this.$('.modal').on('hidden', this.close).modal();

    return this;
  },

  renderTags: function() {
    this.$('#tagList').empty();
    // NOTE: Move to JST template
    var tags = _.map(this.model.get('tags'), function(tag) {
      return '<li><span class="tag">' + tag + '<a class="tag-close">x</a></span></li>';
    });
    
    this.$('#tagList').append(tags.join(''));
  },

  addTag: function(e) {
    if(e.keyCode == 13) {
      console.debug('TweetEdit#addTag');
      var $target = $(e.target);
      this.model.addTag($target.val());
      $target.val('');
    }
  },

  removeTag: function(e) {
    console.debug('TweetEdit#removeTag');
    e.preventDefault();
    var $target = $(e.target);
    var tag = $target.parent().text().substring(0, $target.parent().text().length - 1);
    this.model.removeTag(tag); 
    return false;
  },

  saveTags: function(e) {
    e.preventDefault();
    console.debug('TweetEdit#saveTags');  
    $button = $(e.target);
    $button.button('loading');
    console.debug($button);
    var self = this;
    this.model.save({}, {
      success: function(model, response) {
        console.debug('success');
        self.model.trigger('savedTags');
      },
      error: function(model, response) {
        console.error(response);
      }
    });

    $button.button('reset');
    this.$('.modal').modal('hide');
    this.close();
    return false;
  },
});
