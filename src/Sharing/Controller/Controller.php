<?php

namespace Sharing\Controller;
use Respect\Rest\Routable;

class Controller implements Routable
{
	protected $templateEngine;

	public function __construct($templateEngine = null)
	{
		$this->templateEngine = $templateEngine;
	}

	public function render($view, array $variables = array())
	{
		echo $this->templateEngine->render($view, $variables);
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