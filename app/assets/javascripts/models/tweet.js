ESApp.Models.Tweet = Backbone.Model.extend({
  urlRoot: '/tweets/',

  defaults: {
    'tags': []
  },

  toJSON: function() {
    return { tweet: _.clone(this.attributes) }
  },

  addTag: function(tag) {
    tag = tag.trim();
    var tags = this.get('tags');
    if(!_.include(tags, tag)) {
      tags.push(tag.trim());
      this.set('tags', tags);
      this.trigger('change:tags');
    }
  },

  removeTag: function(tag) {
    var tags = _.without(this.get('tags'), tag);
    this.set('tags', tags);
    this.trigger('change:tags');
  }
});
