ESApp.Models.Search = Backbone.RelationalModel.extend({

  urlRoot: '/tweets',

  relations: [{
    type: Backbone.HasMany,
    key: 'facets',
    relatedModel: 'ESApp.Models.Facet',
    collectionType: 'ESApp.Collections.Facets',
    reverseRelation: {
      key: 'search',
    }
  },
  {
    type: Backbone.HasMany,
    key: 'results',
    relatedModel: 'ESApp.Models.Tweet',
    collectionType: 'ESApp.Collections.SearchResults',
    reverseRelation: {
      key: 'search',
    }
  }],

  initialize: function(options) {
    options || (options = {});

    //this.__parsePageInfo__(options.page_info);

    this.filters  = [];

    this.get('facets').reset(options.facets);
    this.get('results').reset(options.results);
  },

  sync: function(method, model, success, error) {
    var u = this.url() + "?page=" + this.get('page_info').page;
    var params = {
      url       : u,
      dataType  : "json",
      type      : "GET",
      success : success,
      error   : error
    };
    $.ajax(params);
  },

  parse: function(resp) {
    //this.__parsePageInfo__(resp.page_info);
    this.get('results').reset(resp.results);
    this.get('facets').reset(resp.facets);   
    return false;
  }
/*
  __parsePageInfo__: function(options) {
    console.debug(options);
    this.set({ page: (options.page || 1) }),
    this.set({ total: (options.total || 0) }),
    this.set({ perPage: (options.perPage || 10)   
  }
*/
});
