define(['views/RegisterTeacher', 'views/Login', 'views/Alert', 'views/Activate'], function (RegisterTeacherView, LoginView, AlertView, ActivateView) {
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
            var ActivateModel = Backbone.Model.extend({});
            new ActivateView({ model: new ActivateModel({ token: token }) });
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