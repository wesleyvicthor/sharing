define(['backbone', 'models/Group'], function (Backbone, GroupModel) {
	return Backbone.Collection.extend({
		model: GroupModel,
		url: 'groups'
	})
});