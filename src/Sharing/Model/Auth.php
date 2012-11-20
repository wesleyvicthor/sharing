<?php

namespace Sharing\Model;

use Respect\Rest\Router;

class Auth
{
	protected $container;

	public function __construct(Container $container)
	{
		$this->container = $container;
	}

	public function isGranted()
	{
		if (empty($_SESSION['user.email'])
			|| empty($_SESSION['user.passw'])) {
			
			return $this->container->route['login'];
		}
		return true;
	}
}