define(['backbone', 'views/Alert'], function (Backbone, AlertView) {
	return Backbone.Model.extend({
		defaults: {
			name: 'Sharing',
			list: []
		},

		initialize: function () {
			this.on('change:name', this.updateName, this);
		},

		updateName: function () {
			$.post(APP_PATH + 'group/'+this.get('id'), this.attributes,  function (response) {
				(new AlertView({ level: 'Sucesso', message: response.success })).render();
			});
		}
	});
});