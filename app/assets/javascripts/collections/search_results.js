ESApp.Collections.SearchResults = Backbone.Collection.extend({

  model: ESApp.Models.Tweet,

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

  nextPage: function() {
    this.search.trigger('next-page');
  },

  previousPage: function() {
    this.search.trigger('prev-page');
  }
});
