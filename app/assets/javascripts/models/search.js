ESApp.Models.Search = Backbone.Model.extend({

  url: '/search',

  initialize: function() {},

  schema: {
    query:  { type: 'Text' },
    facets: { type: 'List', listType: 'NestedModel', options: this.facets }
  },

  perform: function() {
    $.ajax({
      dataType: "json",
      type: "POST",
      data: this.toJSON(),
      success: function(data) {
        this.results.reset(data.results);
        this.facets.reset(data.facets);
      }
    });
  }
});
