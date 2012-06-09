ESApp.Models.Search = Backbone.Model.extend({

  urlRoot: '/searches',

  initialize: function(options) {
    options || (options = {});
    var pageInfo = {
      page: (options.page || 1),
      total: (options.total || 0),
      perPage: (options.perPage || 10),
    };

    this.results        = new ESApp.Collections.Tweets(pageInfo);
    this.facets         = new ESApp.Collections.Facets(options.facets);
    this.search_history = new ESApp.Collections.SearchHistory();

    this.search_history.fetch();

    this.results.reset(options.results);

    this.set('query', (options.query || ""), { silent: true });
    this.set('took', (options.took || 0), { silent: true });

    this.on('change:query', this.execute, this);
    this.facets.on('doSearch', this.execute, this);
    // TODO: Move to collection
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

  // TODO: Move to collection
  nextPage: function(options) {
    this.results.fetch({ add: true, data: this.request() });
  },

  saveSearch: function() {
    console.debug("Search#saveSearch");
    var savedSearch = new ESApp.Models.SavedSearch({ query: this.get('query'), total: this.get('total'), facets: this.facets.selectedFacets() });

    var self = this;
    savedSearch.save({}, {
      success: function(response) {
        console.debug("success");
      }
    });

    this.search_history.add(savedSearch);
  }

});
