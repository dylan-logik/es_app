ESApp.Collections.SearchResults = Backbone.Collection.extend({

  model: ESApp.Models.Tweet,

  initialize: function(options) {
    _.bindAll(this, 'parse', 'url', 'pageInfo', 'nextPage', 'previousPage');
    this.page = 1;
  },

  url: function() {
    return 'tweets?' + $.param({ page: this.page });
  },

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

  pageInfo: function() {
    var page_info = this.search.get('page_info');
    var info = {
      page: page_info.page,
      total: page_info.total,
      perPage: page_info.perPage,
      pages: Math.ceil(page_info.total / page_info.perPage),
      prev: false,
      next: false
    };
    var max = Math.min(page_info.total, page_info.page * page_info.perPage);
    
    if (page_info.total == page_info.pages * page_info.perPage) {
      max = page_info.total;
    }

    info.range = [(page_info.page - 1) * page_info.perPage + 1, max];

    if (page_info.page > 1) {
      info.prev = page_info.page + 1;
    }

    if (page_info.page < info.pages) {
      info.next = page_info.page + 1;
    }

    return info;
  },

  nextPage: function() {
    this.search.set({ 'page_info.page': this.search.get('page_info').page + 1 });
    this.search.fetch();
  },

  previousPage: function() {
    this.search.set({ 'page_info.page' : this.search.get('page_info').page - 1 });
    this.search.fetch();
  }
});
