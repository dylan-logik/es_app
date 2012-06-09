ESApp.Views.TweetEdit = Support.CompositeView.extend({
  initialize: function() {
    _.bindAll(this, "render", "close", "saveTags");
    this.tags = (this.model.get('tags') || [])
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
    this.$('#addTag')
      .focus(this.onFocusDefaultValue)
      .blur(this.onBlurDefaultValue)
      .blur();

    if(this.tags.length == 0) this.$('#save-tags').attr('disabled', true);

    this.renderTags();

    this.$('.modal').on('hidden', this.close).modal();

    return this;
  },

  renderTags: function() {
    this.$('#tagList').empty();
    var tags = _.map(this.tags, function(tag) {
      return JST['tweets/tag']({ tag: tag });
    });
    
    this.$('#tagList').append(tags.join(''));
  },

  addTag: function(e) {
    if(e.keyCode == 13) {
      var $target = $(e.target);
      var tag = $target.val();
      this.tags.push(tag);
      $target.val('');
      this.$('#tagList').append(JST['tweets/tag']({ tag: tag }));
      if(this.tags.length > 0) this.$('#save-tags').removeAttr('disabled');
    }
  },

  removeTag: function(e) {
    e.preventDefault();
    var $target = $(e.target);
    var tag = $target.parent().text().substring(0, $target.parent().text().length - 1);
    this.tags = _.reject(_.clone(this.tags), function(t) { return t == tag; });
    if(this.tags.length == 0) this.$('#save-tags').attr('disabled', true);
    this.renderTags();
    return false;
  },

  saveTags: function(e) {
    e.preventDefault();
    $button = $(e.target);
    $button.button('loading');
    this.model.set('tags', this.tags);
    var self = this;
    this.model.save({}, {
      success: function(model, response) {
        console.debug('success');
        $button.button('reset');
        self.model.trigger('savedTags');
        self.$('.modal').modal('hide');
      },
      error: function(model, response) {
        console.error(response);
      }
    });

    return false;
  },

  onFocusDefaultValue: function() {
    var $this = $(this);
    if (this.value == $this.data('default-value')) {
      this.value = '';
    }
  },

  onBlurDefaultValue: function() {
    $this = $(this);
    if(this.value == '') {
      this.value = $this.data('default-value');
    }
  }
});
