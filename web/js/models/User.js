define(['backbone'], function (Backbone) {
	return Backbone.Model.extend({
		url: 'user',
		defaults: {
			username: '',
			roles: []
		},

		initialize: function () {
			this.on('change:username', this.changeName, this);
		},

		changeName: function () {
			$.post(APP_PATH + 'user', this.attributes,  function (response) {
				(new AlertView({ level: 'Sucesso', message: response.success })).render();
			});
		}
	});
});