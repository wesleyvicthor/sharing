<?php

namespace Sharing\Controller;
use Respect\Rest\Routable;
use Sharing\Model\Container;

class Controller implements Routable
{
	protected $container;
	const ERROR = 00;
	const SUCCESS = 01;

	public function __construct(Container $container = null)
	{
		$this->container = $container;
	}

	public function render($view, array $variables = array())
	{
		echo $this->container->get('twig')->render($view, $variables);
	}

	public function showMessage($message, $level = self::SUCCESS)
	{
		return array('message' => $message, 'type' => $level);
	}

	public function getController($className)
	{
		var_dump(get_class($this));die;
		$className = '';
		if (!file_exists($className)) {
			return;
		}
		return new $className();
	}

}