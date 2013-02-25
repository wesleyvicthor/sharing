define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {
    return Backbone.View.extend({
        el: $('<div class="alert hidden"/>'),
        events: {
            'click button': 'closeAlert'
        },

        render: function () {
            this.$el.html(_.template($('script#alert-template').html())(this.options));
            $('.alert-wrapper').html(this.$el.fadeIn('fast'));
            this.delegateEvents();
            return this;
        },

        closeAlert: function () {
            this.remove();
        }
    });
});