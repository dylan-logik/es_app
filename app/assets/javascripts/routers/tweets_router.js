ESApp.Routers.Tweets = Backbone.Router.extend({
  initialize: function(options) {
    this.el = $('#tweets');
    //this.model= options.model;
  },

  routes: {
    "": "index",
    ":id": "show"
  },

  index: function() {
    //ESApp.tweets.fetch();
    var view = new ESApp.Views.SearchForm({ model: ESApp.search });
    //var view = new ESApp.Views.TweetsIndex({ collection: ESApp.tweets });
    //var facet_view = new ESApp.Views.FacetsIndex({ collection: ESApp.facets });
    $('body').html(view.render().el);
    //$('body').html(facet_view.render().el);
    //$('body').append(view.render().el);
  }
});
