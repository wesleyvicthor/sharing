(function ($) {
	function redirect(path)
	{
		window.location.href = path;
	}

	function populateUniversities()
	{
		$.get('/universities', function (result) {
			var universities = [];
			$.each(result, function (i, university) {
				universities.push('<option id="'+university.id+'">'+university.name+'</option>');
			});

			$('select[name=university]').html(universities.join());
		}, 'json');

		$('select[name=university]').on('change', function () {
			
		});
	}

	function populateCourses(university_id)
	{
		$.get('/courses', {university: university_id}, function (result) {
			var courses = [];
			$.each(result, function (i, course) {
				courses.push('<option id="'+course.id+'">'+course.name+'</option>');
			});
			$('<select />').attr('name','course').html(courses.join()).insertAfter('select[name=university]');
		}, 'json');
	}

	function newUser(data) 
	{
		$('.form-signin div:first').fadeOut('fast');

		var params = $('#cadastrar-form').serialize()
		params += '&email='+ data.email +'&passw='+ data.passw +'&type='+ data.type;
		$('#cadastrar').on('click', function () {
			$.ajax({
				data: params,
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