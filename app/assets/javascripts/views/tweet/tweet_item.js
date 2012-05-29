ESApp.Views.TweetItem = Support.CompositeView.extend({
  tagName: 'li',
  className: 'row',

  initialize: function() {
    _.bindAll(this, "render");
    this.model.on("change:tags", this.renderTags, this);
  },
  
  events: {
    "keydown #addTag": 'addTag',
    "submit form": 'submitTag',
    "click .tag-close": 'removeTag',
    "click .btn-primary": 'submitTag'
  },

  render: function() {
    this.renderTemplate();
    this.renderContents();
    this.renderTags();
    return this;
  },

  renderTemplate: function() {
    $(this.el).html(JST['tweets/item']({ model: this.model }));
  },

  renderContents: function() {
    this.$('#user').text(this.model.get('user').name);
    this.$('#content').text(this.model.get('text'));
    this.$('.time-stamp').text($.format.date(this.model.get('created_at'), 'ddd MMMM dd, yyyy hh:mma')); 
    this.$('.screen_name').text('@' + this.model.get('user').screen_name);
    this.$('.accordion-inner > p').text(this.model.cid);
    var collapseId = 'collapse' + this.model.cid;
    this.$('.hentry').attr('href', '#' + collapseId); 
    this.$('.collapse').attr('id', collapseId).collapse({
      toggle: false
    });
  },

  renderTags: function() {
    this.$('#tagList').empty();
    var tags = _.map(this.model.get('tags'), function(tag) {
      return '<li><span class="tag">' + tag + '<a class="tag-close">x</a></span></li>';
    });

    this.$('#tagList').append(tags.join(''));
  },

  tweetUrl: function() {
    return '/#/' + this.model.get('id');
  },

  addTag: function(e) {
    if(e.keyCode == 13) {
      console.debug("addTag");
      var $target = $(e.target);
      this.model.addTag($target.val());
      $target.val('');
    }
  },
  
  removeTag: function(e) {
    console.debug("removeTag");
    var $target = $(e.target);
    var tag = $target.parent().text().substring(0, $target.parent().text().length - 1);
    this.model.removeTag(tag);
  },

  submitTag: function(e) {
    console.debug("submitTag");
    e.preventDefault();
    if(e.type == "click") {
      console.debug("savingTags");
      var $button = this.$('#saveTag');
      $button.button('loading');
      console.debug(this.model);
      this.model.save({}, {
        success: function(model, response) {
          $button.button('reset');
        },
        error: function(model, response) {
          console.error("Error saving tags");
          console.debug(response);
          $button.button('reset');
        }
      });
    }
  },
});
