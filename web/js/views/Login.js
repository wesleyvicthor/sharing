define(['backbone', 'views/Alert', 'routes/Home'], function (Backbone, Alert, HomeRouter) {
    return Backbone.View.extend({
        el: '.login-container',
        events: {
            'click input[type=submit]': 'onSubmit'
        },

        render: function () {
            return this;
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
            homeRouter.navigate('', { trigger: true });
            (new Alert({ level: 'Sucesso', message: 'Bem Vindo ' + response.usermail })).render()
        }
    });
});