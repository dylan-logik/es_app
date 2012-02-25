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

    this.on('next-page', this.nextPage);
    this.on('prev-page', this.prevPage);    
  },

  nextPage: function() {
    this.set('page', this.get('page') + 1);
    this.fetch();
  },

  prevPage: function() {
    this.set('page', this.get('page') - 1);
    this.fetch();
  },

  sync: function(method, model, options) {
    var params = {
      url       : this.url(),
      dataType  : "json",
      type      : "GET",
      data      : this.request(),
      success : options.success,
      error   : options.error
    };
    $.ajax(params);
  },

  request: function() {
    var request = { q: this.get('query'), page: this.get('page') }
    var filters = this.get('facets').filters();
    if (filters.and.length > 0) request['filter'] = JSON.stringify(filters)
    return request;
  },

  parse: function(resp) {
    this.set( 'page', (resp.page || 1) );
    this.set( 'total', (resp.total || 0) );
    this.set( 'perPage', (resp.perPage || 10) ); 
    this.set( 'took', (resp.took || 0) );

    this.get('results').reset(resp.results);
    this.get('facets').pivot(resp.facets);   
  }
});
