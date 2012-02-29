ESApp.Collections.SearchResults = Backbone.Collection.extend({

  model: ESApp.Models.Tweet,
  url: 'tweets/search',

  initialize: function(options) {
    _.bindAll(this, 'parse', 'pageInfo', 'nextPage', 'previousPage');
  },

  pageInfo: function() {
    var page = this.search.get('page');
    var total = this.search.get('total');
    var perPage = this.search.get('perPage');

    var info = {
      page: page,
      total: total,
      perPage: perPage,
      pages: Math.ceil(total / perPage),
      prev: false,
      next: false
    };

    var max = Math.min(total, page * perPage);
    
    if (total == info.pages * perPage) {
      max = total;
    }

    info.range = [(page - 1) * perPage + 1, max];

    if (page > 1) {
      info.prev = page + 1;
    }

    if (page < info.pages) {
      info.next = page + 1;
    }

    return info;
  },

  parse: function(resp) {
    return resp.results;
  },

  nextPage: function() {
    this.search.set('page', this.search.get('page') + 1);
    this.fetch({ add: true, data: this.search.request() });
  },

  previousPage: function() {
    this.search.set('page', this.search.get('page') - 1);
    this.fetch({ add: true, data: this.search.request() });
  }
});
