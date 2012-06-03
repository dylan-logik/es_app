ESApp.Collections.Tweets = Backbone.Collection.extend({

  model: ESApp.Models.Tweet,
  url: '/searches/search',

  initialize: function(options) {
    this.page    = options.page;
    this.total   = options.total;
    this.perPage = options.perPage;

    _.bindAll(this, 'parse', 'pageInfo', 'nextPage', 'previousPage');
    //this.on('reset', function() { alert('reset'); });
  },

  pageInfo: function() {
    var page = this.page;
    var total = this.total;
    var perPage = this.perPage;

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
    this.page = this.page + 1;
    this.trigger('nextPage');
  },

  previousPage: function() {
    this.page = this.page - 1;
    this.trigger('previousPage');
  }
});
