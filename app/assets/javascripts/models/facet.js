ESApp.Mixins.Facet = {

  // NOTE: Override these methods in subclass
  idAttribute: 'name',
  type: 'facet',
  boolType: 'or',
  isSelectedItem: function(item) {},
  itemFilter: function() {},

  initialize: function(attrs) {
    this.on('facetSelect', this.onSelect, this);
    this.on('toggleBool', this.onToggleBool, this);
    
    _.each(attrs[this.type], function(item) {
      if (typeof(item.selected) == 'undefined') {
        item.selected = false;
      }
    });
  },

  selectedItems: function() {
    return _.filter(this.get(this.type), function(item) { return item.selected; });
  },

  onSelect: function(id, selected) {
    selected || (selected = false);
    this.updateItem(id, selected);
    this.trigger('doSearch');
  },

  onToggleBool: function(bool) {
    this.boolType = bool;
    this.trigger('change:boolType');
  },

  updateItem: function(id, selected) {
    this.get(this.type)[id].selected = selected;
  },

  pivot: function(attrs, options) {
    var self = this;
    _.chain(attrs[this.type])
      .filter(function(item) { return self.isSelectedItem(item); })
      .each(function(item) { item.selected = true })
      .value();
    this.set(attrs);
  },

  filters: function() {
    var self = this;
    var filter = {};
    filter[this.boolType] = _.map(this.selectedItems(), function(item) {
      return self.itemFilter(item);
    });
    return filter;
  },

  prettyName: function() {
    return _.map(this.escape('name').split(/[\._]/),
      function(part) {
        return part.charAt(0).toUpperCase() + part.slice(1);
      })
    .join(' ');
  }
};
