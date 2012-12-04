(function ($) {
	function redirect(path)
	{
		window.location.href = path;
	}

	function newUser(data) 
	{
		$('.form-signin div:first').fadeOut('fast');

		var params = $('#cadastrar-form').serialize()
		params += '&email='+ data.email +'&passw='+ data.passw +'&type='+ data.type;
		$('#cadastrar').on('click', function () {
			$.ajax({
				data: params
				type: 'post',
				success: function (result) {
					if (result.redirect) {
						return redirect(result.redirect);
					}
				}
			});
		});
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

				if (result.redirect) {
					return redirect(result.redirect);
				}

				var messages = '';
				if (result.type === 0) {
					$.map(result.message, function (message) {
						if (message != '') {
							messages += '- ' + message + "<br />";
						}
					});
				}

				$('.messages').empty();
				$('.messages').html($('<div class="alert alert-error"><div>').html(messages).fadeIn('slow'));
			},
			dataType: 'json'
		});
	});
}(jQuery));