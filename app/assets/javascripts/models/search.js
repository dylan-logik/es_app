ESApp.Models.Search = Backbone.RelationalModel.extend({

  urlRoot: '/search',

  initialize: function(options) {
    options || (options = {});
    this.page     = 1,
    this.total    = (options.total || 0),
    this.perPage  = (options.perPage || 10)
  },

  relations: [{
    type: Backbone.HasMany,
    key: 'facets',
    relatedModel: 'Facet',
    collectionType: 'Facets',
    reverseRelation: {
      key: 'search',
    }
  },
    type: Backbone.HasMany,
    key: 'results',
    relatedModel: 'Tweet',
    collectionType: 'SearchResults',
    reverseRelation: {
      key: 'search',
    }
  }],

  sync: function(method, collection, success, error) {
    var params = {
      url     : this.url,
      type    : "POST",
      data    : this.toJSON(),
      success : success,
      error   : error
    };
    $.ajax(params);
  },

  parse: function(resp) {
    this.get('results').reset(resp.results);
    this.get('facets').reset(resp.facets);   
    return false;
  }
});
