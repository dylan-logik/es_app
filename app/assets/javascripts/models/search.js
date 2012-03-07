ESApp.Models.Search = Backbone.Model.extend({

  urlRoot: '/tweets/search',

  initialize: function(options) {
    options || (options = {});
    var pageInfo = {
      page: (options.page || 1),
      total: (options.total || 0),
      perPage: (options.perPage || 20),
    };

    this.results = new ESApp.Collections.SearchResults(pageInfo);
    this.facets = new ESApp.Collections.Facets();
    this.facets.reset(options.facets);
    this.results.reset(options.results);
    this.set('query', (options.query || ""));
    this.set('took', (options.took || 0));

    this.facets.on('doSearch', this.search, this);
    this.results.on('doSearch', this.nextPage, this);
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
    var request = { q: this.get('query'), page: this.results.page }
    var filters = this.facets.filters();
    if (filters.and.length > 0) request['filter'] = JSON.stringify(filters)
    return request;
  },

  parse: function(resp) {
    this.set('took', (resp.took || 0));
    console.debug(resp.facets);
    this.facets.pivot(resp.facets);
    this.results.reset(resp.results);
  },

  search: function(options) {
    this.results.page = 1;
    this.fetch(options);
  },

  nextPage: function(options) {
    this.results.fetch({ add: true, data: this.request() });
  }
});
