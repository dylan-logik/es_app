ESApp.Views.TweetItem = Support.CompositeView.extend({
  tagName: 'li',
  className: 'row',

  initialize: function() {
    _.bindAll(this, "render");
    this.model.on("savedTags", this.renderTags, this);
  },
  
  events: {
    'click #tag-btn': 'tagModal',
  },

  tagModal: function() {
    var editView = new ESApp.Views.TweetEdit({ model: this.model });
    this.appendChild(editView);
    return this;
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
    this.$('.accordion-body > p').text(this.model.cid);
    var self = this;
    this.$('.collapse').attr('id', 'collapse-' + this.model.cid)
      .on('hidden', function() {
        self.$('.accordion-toggle > i').toggleClass('icon-plus').toggleClass('icon-minus');
      })
      .on('shown', function() {
        self.$('.accordion-toggle > i').toggleClass('icon-minus').toggleClass('icon-plus');
      })
      .collapse({
        toggle: false
      });
  },

  renderTags: function() {
    if (this.model.get('tags') == null) return this;
    var tagList = this.$('#tagList-' + this.model.cid);
    tagList.empty();
    // NOTE: Move to JST template
    var tags = _.map(this.model.get('tags'), function(tag) {
      return '<li><span class="tag label label-warning">' + tag + '</span></li>';
    });

    tagList.append(tags.join(''));
    return this;
  },

  tweetUrl: function() {
    return '/#/' + this.model.get('id');
  },

});
