ESApp.Models.Search = Backbone.Model.extend({

  urlRoot: '/searches',

  initialize: function(options) {
    options || (options = {});
    var pageInfo = {
      page: (options.page || 1),
      total: (options.total || 0),
      perPage: (options.perPage || 20),
    };

    this.results  = new ESApp.Collections.SearchResults(pageInfo);
    this.facets   = new ESApp.Collections.Facets(options.facets);
    this.stats    = new ESApp.Collections.Facets(options.stats);
    this.results.reset(options.results);

    this.set('query', (options.query || ""), { silent: true });
    this.set('took', (options.took || 0), { silent: true });

    this.facets.on('doSearch', this.execute, this);
    this.results.on('doSearch', this.nextPage, this);
  },

  request: function() {
    var request = { query: this.get('query'), page: this.results.page }
    var filters = this.facets.filters();
    if (filters.length > 0) request['filter'] = JSON.stringify(filters)
    return request;
  },

  execute: function() {
    console.debug('execute');
    var self = this;
    var request = self.request();
    this.results.page = 1;
    var params = {
      url       : 'searches/search', 
      dataType  : "json",
      type      : "GET",
      data      : self.request(),
    };
    $.ajax(params)
      .success(function(data) {
        self.set('took', (data.took || 0), { silent: true });
        self.set('total', (data.total || 0));
        self.facets.pivot(data.facets);
        self.results.reset(data.results);
      });
  },

  nextPage: function(options) {
    this.results.fetch({ add: true, data: this.request() });
  }
});
