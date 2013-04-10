define(['backbone', 'underscore'], function (Backbone, _) {
    return Backbone.View.extend({
        template: $('script#register-teacher').html(),

        initialize: function () {
            this.render();
        },

        render: function () {
            var registerTeacher = this.$el.html(
                _.template(this.template)
            );

            $('.login-container').html(registerTeacher.fadeIn('slow'));
        }
    });
});