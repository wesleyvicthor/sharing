define(['backbone', 'models/Group'], function (Backbone, GroupModel) {
	return Backbone.Collection.extend({
		url: 'groups',
		model: GroupModel,
		initialize: function () {
			this.fetch();
		}
	});
});