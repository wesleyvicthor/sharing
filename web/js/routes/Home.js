define(['backbone', 'jquery'], function (Backbone, $) {
    return Backbone.Router.extend({
        routes: {
            '': 'homePage'
        },

        initialize: function (options) {
            console.log(options);
            this.loginview = options.loginview;
        },

        homePage: function () {
            console.log(this.loginview);
            $(this.loginview.el).fadeOut('slow');
        }
    });
});