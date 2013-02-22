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

requirejs(['jquery', 'backbone', 'views/Login'], function ($, Backbone, LoginView) {
	(new LoginView()).render();
});