define(['backbone', 'models/File'], function (Backbone, FileModel) {
	return Backbone.Collection.extend({
		url: 'files',
		model: FileModel
	});
});