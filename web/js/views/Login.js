define(['backbone', 'underscore', 'views/Alert', 'routes/Login'], function (Backbone, _, Alert, LoginRoute) {
    return Backbone.View.extend({
        template: $('script#login').html(),
        events: {
            'click input[type=submit]': 'onSubmit',
            'click a': 'handleLink'
        },

        render: function () {
            this.$el.html(
                _.template(this.template)
            );
            return this;
        },

        handleLink: function (event) {
            event.preventDefault();
            Sharing.Router.Login.navigate('register-teacher', true);
        },

        onSubmit: function (event) {
            event.preventDefault();
            var params = $('form', this.el).serialize();
            $.post(APP_PATH + 'login_check', params, this.handleAuth);
        },

        handleAuth: function (response) {
            if (response.fail) {
                return (new Alert({ level: 'Atenção', message: response.fail })).render();
            }

            Sharing.User = {
                id: response.id,
                username: response.username,
                roles: response.userRoles,
                isTeacher: function () {
                    var role = response.userRoles[0];
                    return  role == 'ROLE_TEACHER';
                }
            };
            Sharing.Router.Home.navigate('homepage', { trigger: true });
            (new Alert({ level: 'Sucesso', message: 'Bem Vindo ' + Sharing.User.username })).render()
        }
    });
});