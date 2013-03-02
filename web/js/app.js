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

requirejs(['views/Login'], function (LoginView) {
    (new LoginView()).render();
    Backbone.history.start({pushState: true, root:'/app_dev.php/'});
});