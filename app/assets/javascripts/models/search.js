ESApp.Models.Search = Backbone.RelationalModel.extend({

  urlRoot: '/tweets/search',

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

    this.filters  = [];
    this.set('query', "");

    this.get('facets').reset(options.facets);
    this.get('results').reset(options.results);
  },

  sync: function(method, model, options) {
    var params = {
      url       : this.url(),
      dataType  : "json",
      type      : "GET",
      data      : { query: this.get('query'), page: this.get('page') },
      success : options.success,
      error   : options.error
    };
    $.ajax(params);
  },

  parse: function(resp) {
    this.set( 'page', (options.page || 1) );
    this.set( 'total', (options.total || 0) );
    this.set( 'perPage', (options.perPage || 10) ); 

    this.get('results').reset(resp.results);
    this.get('facets').reset(resp.facets);   
  }
});
