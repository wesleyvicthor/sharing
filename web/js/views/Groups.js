define(['backbone', 'views/GroupBox', 'underscore', 'models/GroupList'], function (Backbone, GroupBoxView, _, GroupListModel) {
	return Backbone.View.extend({
		initialize: function (collection) {
			this.collection = collection;
			$('.section-name').html('Turmas');
			this.collection.on('reset', this.render, this);
		},

		render: function () {
			_.each(this.collection.models, function (group) {
				$('#groups').append(
					$((new GroupBoxView(group)).render()).fadeIn('slow')
				)
			});
		}
	});
});