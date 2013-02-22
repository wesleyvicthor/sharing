define(['backbone'], function (Backbone) {
	return Backbone.View.extend({
		el: '.login-container',
		render: function () {
			this.$el.html('<input type="text" placeholder="Email" name="email" /><input type="password" placeholder="Senha" name="passw" />');
			return this;
		}
	});
});