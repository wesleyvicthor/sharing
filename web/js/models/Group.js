define(['backbone'], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			name: 'Sharing',
			list: []
		}
	});
});