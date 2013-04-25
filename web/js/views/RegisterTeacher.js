define(['backbone', 'underscore', 'autocomplete', 'views/Alert'], function (Backbone, _, autocomplete, AlertView) {
    return Backbone.View.extend({
        template: $('script#register-teacher').html(),

        events: {
            'click input[name=university]': 'bindAutocompleteUniversity',
            'click input[name=course]': 'bindAutocompleteCourse',
            'click input[type=submit]': 'submitRegisterTeacher'
        },

        initialize: function () {
            this.autocompleteConfig = {
                dataType: 'json',
                paramName: 'q',
                minChars: 2,
                width: 'none',
                noCache: true,
                onSelect: function (response) {
                    $(this).data('id', response.data);
                }
            };
        },

        submitRegisterTeacher: function (event) {
            event.preventDefault();
            var params = this.$('form').serialize();
            var courseId = this.$('input[name=course]').data('id');
            var universityId = this.$('input[name=university]').data('id');

            params += '&course_id=' + ((courseId == undefined) ? '' : courseId);
            params += '&university_id=' + ((universityId == undefined) ? '' : universityId);
            $.post(APP_PATH + 'register-teacher', params, function (response) {
                if (undefined !== response.success) {
                    (new AlertView({ level: 'Sucesso', message: response.success })).render();
                    Sharing.Router.Login.navigate('login', true);
                    return;
                }
                return (new AlertView({ level: 'Atenção', message: response.fail })).render();
            });
        },

        bindAutocompleteCourse: function (event) {
            $('#autocomplete-course').empty();
            this.$('input[name=course]').autocomplete(
                _.extend({
                    serviceUrl: APP_PATH + 'search-course/' + $('input[name=university]').data('id'),
                    appendTo: '#autocomplete-course',
                }, this.autocompleteConfig)
            );
        },

        bindAutocompleteUniversity: function (event) {
            $('#autocomplete-university').empty();
            this.$('input[name=university]').autocomplete(
                _.extend({
                    serviceUrl: APP_PATH + 'search-university',
                    appendTo: '#autocomplete-university'
                }, this.autocompleteConfig)
            );
        },

        render: function () {
            this.$el.html(
                _.template(this.template)
            );
            return this;
        }
    });
});