ESApp.Models.Facet = Backbone.Model.extend({

  idAttribute: 'name',

  items: function() {},
  selectedItems: function() {},
  type: 'facet',

  onSelect: function(id, selected) {
    selected || (selected = false);
    this.updateItem(id, selected);
    this.trigger('doSearch');
  },

  pivot: function(attrs, options) {
    var items = this.items();
    var self = this;

    var selectedItems = this.selectedItem();
    _.each(attrs[type]
  },

});
