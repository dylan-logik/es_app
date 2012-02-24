ESApp.Collections.SearchResults = Backbone.Collection.extend({

  model: ESApp.Models.Tweet,

  initialize: function(options) {
    _.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage', 'previousPage', 'reset');
    this.page = 1;
  },

  url: function() {
    return 'tweets?' + $.param({ page: this.page });
  },
/*
  fetch: function(options) {
    options || (options = {});
    this.trigger('fetching');
    var self = this;
    var success = options.success;
    options.success = function(resp) {
      self.trigger('refresh');
      if(success) { success(self, resp); }
    };
    Backbone.Collection.prototype.fetch.call(this, options);
  },

  parse: function(resp) {
    this.page = resp.page,
    this.perPage = resp.perPage;
    this.total = resp.total;
    return resp.tweets;
  },
*/
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
    console.debug(info);
  },

  nextPage: function() {
    this.search.set({ 'page': this.search.get('page') + 1 });
    this.search.fetch();
  },

  previousPage: function() {
    this.search.set({ 'page' : this.search.get('page') - 1 });
    this.search.fetch();
  }
});
