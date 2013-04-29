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
            $.post(APP_PATH + 'activate/'+this.model.get('token'), params, function (response) {
                if (response.fail != undefined) {
                    (new AlertView({ level: 'Info', message: response.fail })).render();
                    return;    
                }
                
                (new AlertView({ level: 'Info', message: response.success })).render();
                Sharing.Router.Login.navigate('login', true);
            });
        },

        render: function () {
            this.$el.html(_.template(this.template));
            $('.login-container').html(this.$el.fadeIn('fast'));
            return this;
        }
    });
});