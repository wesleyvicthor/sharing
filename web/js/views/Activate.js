define(['backbone', 'underscore', 'views/Alert'], function (Backbone, _, AlertView) {
    return Backbone.View.extend({
        template: $('script#activate').html(),
        events: {
            'click input[type=submit]': 'submit'
        },

        initialize: function () {
            this.render();
        },

        submit: function (event) {
            event.preventDefault();
            var params = this.$('form').serialize();
            this.sendToken(this.model.get('token'), params);
        },

        sendToken: function (token, params) {
            $.post(APP_PATH + 'activate/'+token, params, function (response) {
                if (response.fail != undefined) {
                    (new AlertView({ level: 'Info', message: response.fail })).render();
                    return;    
                }
                
                (new AlertView({ level: 'Info', message: response.success })).render();
                Sharing.Router.Login.navigate('login', true);
            });
        },

        render: function () {
            var token = this.model.get('token');
            if (token.indexOf('.') !== -1) {
                this.sendToken(token);
                return;
            }
            this.$el.html(_.template(this.template));
            $('.login-container').html(this.$el.fadeIn('fast'));
            (new AlertView({ level: 'Info', message: 'Para ativar seu acesso cadastre uma senha\ncom no mínimo 8 caracteres.' })).render()
            return this;
        }
    });
});