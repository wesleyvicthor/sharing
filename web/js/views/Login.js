define(['backbone', 'underscore', 'views/Alert', 'routes/Home', 'routes/Login'], function (Backbone, _, Alert, HomeRouter, LoginRoute) {
    return Backbone.View.extend({
        template: $('script#login').html(),
        events: {
            'click input[type=submit]': 'onSubmit'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            var login = this.$el.html(
                _.template(this.template)
            );
            $('.login-container').html(login.fadeIn('slow'));
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