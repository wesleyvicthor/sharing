requirejs.config({
    baseUrl: '../../js',
    urlArgs: 'v=' + (new Date()).getTime(),
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    },
    paths: {
        'backbone': 'libs/backbone',
        'underscore': 'libs/underscore',
        'jquery': 'libs/jquery',
        'autocomplete': 'libs/autocomplete',
        'queryparams': 'libs/backbone.queryparams',
        'bootstrap': 'libs/bootstrap.min',
        'jquery-ui': 'libs/jquery-ui'
    }

});

window.Sharing = {};
Sharing.Router = {};

requirejs(['routes/Login', 'routes/Home'], function (LoginRouter, HomeRouter) {
    Sharing.Router.Login = new LoginRouter();
    Sharing.Router.Home = new HomeRouter();

    Backbone.history.start({pushState: true, root:'/app_dev.php/'});

    $('input').on('focusout', function () {
        $('.input-wrapper').css('border-color', '#fff');
    });

    $('input').on('focus', function () {
        $('.input-wrapper').css('border-color', '#fff');
        $(this).parent('.input-wrapper').css('border-color', 'rgb(209, 229, 238)');
    });
});