define(['views/RegisterTeacher'], function (RegisterTeacherView) {
    return Backbone.Router.extend({
        routes: {
            'register-teacher': 'displayRegisterTeacherView'
        },

        displayRegisterTeacherView: function () {
            new RegisterTeacherView();
        }
    });
});