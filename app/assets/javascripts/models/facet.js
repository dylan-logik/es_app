ESApp.Models.Facet = Backbone.Model.extend({

  // NOTE: Override these methods in subclass
  idAttribute: 'name',
  isSelectedItem: function() {},
  type: 'facet',

  onSelect: function(id, selected) {
    selected || (selected = false);
    this.updateItem(id, selected);
    this.trigger('doSearch');
  },

  updateItem: function(id, selected) {
    this.get(this.type)[id].selected = selected;
  },

  pivot: function(attrs, options) {
    var self = this;
    _.chain(attrs[this.type])
      .filter(function(item) { return self.isSelectedItem(item); })
      .map(function(item) { item.selected = true })
    this.reset(attrs);
  },

});
