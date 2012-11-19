<?php

namespace Sharing\Controller;

class Login extends Controller
{
	public function get()
	{
		try {
			$this->render('login/index.html.twig');
		} catch (\Exception $e) {

		}
	}
}