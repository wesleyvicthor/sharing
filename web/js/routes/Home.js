define(['backbone', 'jquery', 'underscore', 'views/Home'], function (Backbone, $, _, Home) {
    return Backbone.Router.extend({
        template: $('script#homepage').html(),
        routes: {
            'homepage': 'homePage',
            'register-group': 'registerGroup'
        },

        registerGroup: function () {
        	new Home();
        	$('a[href=#register-group]').click();
        },

        homePage: function () {
            new Home();
        }
    });
});