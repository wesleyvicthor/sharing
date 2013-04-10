define(['backbone', 'views/Alert', 'routes/Home', 'routes/Login'], function (Backbone, Alert, HomeRouter, LoginRoute) {
    return Backbone.View.extend({
        el: '.login-container',
        events: {
            'click input[type=submit]': 'onSubmit',
            'click .register-teacher small': 'displayRegisterTeacherView'
        },

        render: function () {
            return this;
        },

        displayRegisterTeacherView: function () {
            var loginRoute = new LoginRoute();
            loginRoute.navigate('register-teacher', { trigger: true });
        },

        onSubmit: function (event) {
            event.preventDefault();
            var params = $('form', this.el).serialize();
            $.post(APP_PATH + 'login_check', params, this.handleAuth);
        },

        handleAuth: function (response) {
            if (response.fail) {
                return (new Alert({ level: 'Atenção', message: 'Login ou Senha inválida!' })).render();
            }

            var homeRouter = new HomeRouter();
            homeRouter.navigate('homepage', { trigger: true });
            
            (new Alert({ level: 'Sucesso', message: 'Bem Vindo ' + response.usermail })).render()
        }
    });
});