ESApp.Models.Search = Backbone.Model.extend({

  urlRoot: '/searches',

  defaults: {
    "sort": "_score"
  },

  sortMap: {
    "Score"         : "_score",
    "Retweet Count" : "retweet_count",
    "Date"          : "created_at"
  },

  initialize: function(options) {
    // Set Defaults
    options || (options = {});
    var pageInfo = {
      page: (options.page || 1),
      total: (options.total || 0),
      perPage: (options.perPage || 10),
    };

    // Bootstrap Model
    this.results        = new ESApp.Collections.Tweets(pageInfo);
    this.facets         = new ESApp.Collections.Facets(options.facets);
    this.search_history = new ESApp.Collections.SearchHistory();
    this.results.reset(options.results);
    this.set('query', (options.query || ""), { silent: true });
    this.set('took', (options.took || 0), { silent: true });

    // Event Binding
    this.on('change:query', this.execute, this);
    this.on('change:sort', this.execute, this);
    this.facets.on('doSearch', this.execute, this);
    this.results.on('nextPage', this.nextPage, this);
  },

  request: function() {
    var request = { query: this.get('query'), sort: this.get('sort'), page: this.results.page }
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
        console.debug(data);
        self.set('took', (data.took || 0));
        self.set('total', (data.total || 0));
        self.facets.pivot(data.facets);
        self.results.reset(data.results);
      });
  },

  nextPage: function(options) {
    this.results.fetch({ add: true, data: this.request() });
  },

  saveSearch: function() {
    console.debug("Search#saveSearch");
    this.search_history.create({ query: this.get('query'), total: this.get('total'), facets: this.facets.selectedFacets(), sort: this.get('sort') }, { wait: true });
    return true;
  },

});
