define(['backbone'], function (Backbone) {
	return Backbone.View.extend({
		events: {
			'mouseover .user-info .user-photo': 'changePhotoHover',
			'click .user-info .user-photo': 'changePhoto',
			'blur .user-info .user-name': 'changeName',
			'dblclick .user-info .user-name': 'setEditable'
		},

		initialize: function (model) {
			this.model = model;
			this.render();
		},

		changePhotoHover: function (event) {
			$(event.target).text('Alterar foto');
		},

		changePhoto: function () {
			console.log('alterar foto do usuário');
		},

		setEditable: function (event) {
			console.log(event, event.target);
			$(event.target).attr({ contenteditable: true });
		},

		changeName: function (event) {
			this.model.set('name', $(event.target).text());
		},

		render: function () {
            var userTemplate = '<div class="user-photo icon-user"></div>';
            	userTemplate += '<span class="user-name">'+this.model.get('username')+'</span>';
            $('.user-info').html(this.$el.html(userTemplate));
		}
	});
});