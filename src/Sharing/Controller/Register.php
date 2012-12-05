<?php

namespace Sharing\Controller;

use Respect\Validation\Validator as v;
use Sharing\Model\Container;

class Register extends Controller
{
	protected $register;

	public function __construct(Container $container)
	{
		parent::__construct($container);
		$this->register = new \Sharing\Model\Register($this->container);
	}

	public function getCourses()
	{
		$courses = $this->register->getCoursesByUniversityId($_GET['university']);
		return json_encode($courses);
	}

	public function getUniversities()
	{
		$universities = $this->register->getUniversities();
		return json_encode($universities);
	}

	public function register()
	{
		$this->register->newTeacher($_POST);
	}
}