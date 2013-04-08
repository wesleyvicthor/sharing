define(['backbone'], function (Backbone) {
	return Backbone.View.extend({
		template: $('script#homepage').html(),
		
		initialize: function () {
			this.render();
		},

		render: function () {
            $('.main-container').empty();

			var $homepage = this.$el.html(_.template(this.template));
            $('.main-container').html($homepage.fadeIn('slow'));
		}
	});
});