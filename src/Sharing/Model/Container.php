<?php

namespace Sharing\Model;

class Container
{
	protected $items = array();
	public $route = array();

	public function add($index, $value)
	{
		if ($value instanceof \Respect\Rest\Routes\AbstractRoute) {
			$this->route[$index] = $value;
		} else {
			$this->items[$index] = $value;
		}
	}

	public function get($index)
	{
		if (empty($this->items[$index])) {
			return null;
		}
		return $this->items[$index];
	}
}