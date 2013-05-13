define(['backbone'], function (Backbone) {
	return Backbone.View.extend({
		events: {
			'mouseover .user-photo': 'changePhotoHover',
			'click .user-photo': 'changePhoto',
			'click .user-name': 'changeName'
		},

		changePhotoHover: function (event) {
			$(event.target).text('Alterar foto');
		},

		changePhoto: function () {
			console.log('alterar foto do usuário');
		},

		changeName: function () {
			// content editable true!
		},

		initialize: function () {
			this.render();
		},

		render: function () {
            // <div class="user-settings icon-user-config"></div>
            
            var userTemplate = '<div class="user-photo icon-user"></div>';
            	userTemplate += '<span class="user-name">'+this.model.username+'</span>';
            $('.user-info').html(userTemplate);
		}
	});
});