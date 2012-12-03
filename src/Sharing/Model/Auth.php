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
			return header('Location: /login');
		}
		return true;
	}

	public function authenticate($user, $passw)
	{

	}
}