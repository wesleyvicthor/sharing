define(['backbone', 'jquery', 'underscore', 'views/Home'], function (Backbone, $, _, Home) {
    return Backbone.Router.extend({
        template: $('script#homepage').html(),
        routes: {
            'homepage': 'homePage'
        },

        homePage: function () {
            new Home();
        }
    });
});