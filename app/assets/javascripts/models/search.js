ESApp.Models.Search = Backbone.Model.extend({

  urlRoot: '/searches',

  // Only really needed for bootstrapping the application
  initialize: function(options) {
    options || (options = {});
    var pageInfo = {
      page: (options.page || 1),
      total: (options.total || 0),
      perPage: (options.perPage || 20),
    };

    this.results  = new ESApp.Collections.Tweets(pageInfo);
    this.facets   = new ESApp.Collections.Facets(options.facets);

    if (options.results) {
      this.results.reset(options.results);
    }


    this.set('query', (options.query || ""), { silent: true });
    this.set('took', (options.took || 0), { silent: true });

    this.on('change:query', this.execute, this);
    this.facets.on('doSearch', this.execute, this);
    // Maybe move to Tweets collection. 
    this.results.on('nextPage', this.nextPage, this);
  },

  request: function() {
    var request = { query: this.get('query'), page: this.results.page }
    var filters = this.facets.filters();
    if (filters.length > 0) request['filter'] = JSON.stringify(filters)
    return request;
  },

  execute: function() {
    console.debug('execute');
    this.results.page = 1;
    var request = this.request();
    var params = {
      url       : 'searches/search', 
      dataType  : "json",
      type      : "GET",
      data      : request,
    };
    var self = this;
    $.ajax(params)
      .success(function(data) {
        self.set('took', (data.took || 0));
        self.set('total', (data.total || 0));
        self.facets.pivot(data.facets);
        self.results.reset(data.results);
      });
  },

  // Maybe move to collection. The only issue is it needs the request from the search
  nextPage: function(options) {
    this.results.fetch({ add: true, data: this.request() });
  }
});
