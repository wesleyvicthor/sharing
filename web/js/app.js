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
        'jquery': 'libs/jquery'
    }

});

requirejs(['routes/Login'], function (LoginRoute) {
    var loginRoute = new LoginRoute();
    Backbone.history.start({pushState: true, root:'/app_dev.php/'});

    $('[data-uri]').on('click', function (event) {
        event.preventDefault();
        loginRoute.navigate($(this).data('uri'), { trigger: true });
    });

    $('input').on('focusout', function () {
        $('.input-wrapper').css('border-color', '#fff');
    });

    $('input').on('focus', function () {
        $('.input-wrapper').css('border-color', '#fff');
        $(this).parent('.input-wrapper').css('border-color', 'rgb(209, 229, 238)');
    });
});