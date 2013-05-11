define(['backbone', 'views/GroupBox', 'underscore'], function (Backbone, GroupBoxView, _) {
	return Backbone.View.extend({
		initialize: function (collection) {
			this.collection = collection;
			$('.section-name').html('Turmas');
		},

		render: function () {
			_.each(this.collection, function (group) {
				$('#groups').append(
					(new GroupBoxView(group)).$el.fadeIn('slow')
				)
			});
		}
	});
});