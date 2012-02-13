ESApp.Views.SearchForm = Backbone.View.extend({
  tagName: 'form',
  id: 'search-form',

  events: {
    "submit": "submit"
  },

  initialize: function() {
    _.bindAll(this, "render");
  },

  render: function() {
    this.form = new Backbone.Form({ model: this.model });
    $(this.el).html(this.form.render().el);
    this.$('ul').append(JST['search/form_buttons']());
    return this;
  },

  submit: function() {
    this.form.commit();
    this.model.permform();
  }
});
