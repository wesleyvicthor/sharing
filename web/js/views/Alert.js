define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {
    return Backbone.View.extend({
        el: $('<div class="alert hidden"/>'),
        events: {
            'click button': 'closeAlert'
        },

        initialize: function (alert) {
            this.model = _.extend({
                context: 'Info'
            }, alert);
        },

        render: function () {
            this.$el.html(_.template($('script#alert-template').html())(this.model));
            $('.alert-wrapper').html(this.$el.fadeIn('fast'));
            this.delegateEvents();
            setTimeout(this.closeAlert(this), 5000);
            return this;
        },

        closeAlert: function (self) {
            return function () {
                self.$el.fadeOut('slow', function () {
                    self.remove();
                });
            }
        }
    });
});