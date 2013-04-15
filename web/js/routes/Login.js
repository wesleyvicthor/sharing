define(['views/RegisterTeacher', 'views/Login', 'views/Alert'], function (RegisterTeacherView, LoginView, AlertView) {
    return Backbone.Router.extend({
        routes: {
            'register-teacher': 'displayRegisterTeacherView',
            'login': 'displayLoginView',
            'activate/:token': 'activateUser'
        },

        initialize: function () {
            this.navigate('login', { trigger: true });
        },

        activateUser: function (token) {
            console.log(token);

            $.post(APP_PATH + 'activate/'+token, function (response) {
                var message = (response.fail == undefined ) ? response.success : response.fail;
                (new AlertView({ level: 'Info', message: message })).render();
            });
        },

        displayRegisterTeacherView: function () {
            var $registerTeacherView = (new RegisterTeacherView()).render().$el;
            $('.login-container').empty();
            $registerTeacherView.detach();
            $('.login-container').html($registerTeacherView.fadeIn('slow'));
        },

        displayLoginView: function () {
            var $loginView = (new LoginView()).render().$el;
            $('.login-container').empty();
            $loginView.detach();
            $('.login-container').html($loginView.fadeIn('fast'));
        }
    });
});