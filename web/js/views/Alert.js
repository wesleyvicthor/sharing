define(['backbone', 'underscore', 'jquery'], function (Backbone, _, $) {
    return Backbone.View.extend({
        el: $('<div class="alert hidden"/>'),
        template: _.template($('script#alert-template').html()),
        events: {
            'click button': 'closeAlert'
        },

        render: function () {
            if ($('.alert-wrapper').children().length) {
                return;
            }
            this.$el.html(this.template(this.options));
            $('.alert-wrapper').html(this.$el.fadeIn('fast'));
            return this;
        },

        closeAlert: function () {
            this.remove();
        }
    });
});