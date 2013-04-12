define(['views/RegisterTeacher', 'views/Login'], function (RegisterTeacherView, LoginView) {
    return Backbone.Router.extend({
        routes: {
            'register-teacher': 'displayRegisterTeacherView',
            'login': 'displayLoginView'
        },

        initialize: function () {
            this.navigate('login', { trigger: true });
        },

        displayRegisterTeacherView: function () {
            new RegisterTeacherView();
        },

        displayLoginView: function () {
        	new LoginView();
        }
    });
});