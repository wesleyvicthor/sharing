define(['backbone'], function (Backbone) {
	return Backbone.Model.extend({
		defaults: {
			fileicon: '',
			filename: 'My Sex Folder',
			filetype: 'folder',
			datetime: 'some day anywhere'
		},

		initialize: function () {
		}
	});
});