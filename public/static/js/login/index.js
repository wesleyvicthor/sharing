(function ($) {
	function redirect(path)
	{
		window.location.href = path;
	}

	function newUser(input) 
	{
		$('.form-signin div:first').fadeOut('fast');
	}

	$('.form-signin button').on('click', function (event) {
		var params = $('form').serialize();
		params += '&type=' + $(this).attr('id');
		$.ajax({
			type: 'post',
			data: params, 
			url: '/login',
			success: function (result, textStatus, jqxhr) {
				
				if (result.auth == false && result.type == 'teacher') {
					return newUser(result);
				}

				var messages = '';
				if (result.redirect) {
					redirect(result.redirect);
				}
				if (result.type === 0) {
					$.map(result.message, function (message) {
						if (message != '') {
							messages += '- ' + message + "<br />";
						}
					});
				}

				if (result.redirect !== undefined) {
					window.location.href = result.redirect;
				}

				if (this.statusCode = 401) {
					newUser(result);
				}

				$('.messages').empty();
				$('.messages').html($('<div class="alert alert-error"><div>').html(messages).fadeIn('slow'));
			},
			dataType: 'json'
		});
	});
}(jQuery));