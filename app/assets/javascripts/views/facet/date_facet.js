ESApp.Views.DateFacet = Support.CompositeView.extend({

  className: 'facet span3',

  initialize: function() {
    _.bindAll(this, "render", "renderContents", "clear");
  },

  events: {
    'click #clear-date-facet': 'clear'
  },

  render: function() {
    console.debug("DateFacet#render");
    this.$el.html(JST['facets/date']());
    this.renderContents();

    var model = this.model;
    this.$('#start-date').datepicker()
      .on('changeDate', function(ev) {
        model.set({min: ev.date.valueOf(), selected: true });
      });

    this.$('#end-date').datepicker()
      .on('changeDate', function(ev) {
        model.set({ max: ev.date.valueOf(), selected: true });
      });

    return this;
  },

  renderContents: function() {
    this.$('.facet-name > strong').text(this.model.prettyName());

    var formattedStart = $.format.date(this.model.get('min'), 'MM-dd-yyyy')
    var formattedEnd = $.format.date(this.model.get('max'), 'MM-dd-yyyy')

    this.$('#start-date').attr('data-date', formattedStart); 
    this.$('#end-date').attr('data-date', formattedEnd);
    this.$('#start-date > input').attr('value', formattedStart);
    this.$('#end-date > input').attr('value', formattedEnd);

    return this;
  },

  clear: function(e) {
    console.debug('clear');
    e.preventDefault();
    this.model.set("selected", false);
    return false;
  }
});
