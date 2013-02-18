<?php

namespace Sharing\Controller;

class Index extends Controller
{
	public function get()
	{
		try {
			return $this->render('index/index.html.twig');
		} catch (\Exception $e) {
			echo $e->getMessage();
		}
	}

	public function post()
	{
		
	}
}