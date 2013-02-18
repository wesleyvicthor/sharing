<?php

namespace Sharing\Model;

class Register
{
	protected $container;

	public function __construct(Container $container)
	{
		$this->container = $container;
	}

	public function newTeacher($data)
	{
		$emails = explode(';', $data['email-list']);
		$mapper = $this->container->get('mapper');

		$user = new StdClass();
		$user->email = $data['email'];
		$user->passw = $data['passw'];
		$user->type = $data['type'];

		$mapper->user->persist($user);
		$mapper->flush();

		$group = new StdClass();
		$group->name = filter_input(INPUT_POST, 'group-name', FILTER_SANITIZE_STRING);
		$group->description = filter_input(INPUT_POST, 'group-description', FILTER_SANITIZE_STRING);
		$group->owner_id = $user->id;

		$mapper->group->persist($group);
		$mapper->flush();

		foreach ($emails as $email) {
			$userGroup = new StdClass();
			$userGroup->group_id = $group->id;

			$newUser = new StdClass();
			$newUser->university_id = 1;
			$newUser->course_id = 1;
			$newUser->email = $email;
			$newUser->type = 'user';

			$mapper->user->persist($newUser);
			$mapper->flush();

			$userGroup->user_id = $newUser->id;
			$mapper->userGroup->persist($userGroup);
			$mapper->flush();
		}
	}

	public function getUniversities()
	{
		$mapper = $this->container->get('mapper');
		$universities = $mapper->university->fetchAll();
		return $universities;
	}

	public function getCoursesByUniversityId($universityId)
	{
		$mapper = $this->container->get('mapper');

		$coursesUniversity = $mapper->courseUniversity(array('university_id' => (int) $universityId))->fetchAll();
		$courses = array();

		foreach ($coursesUniversity as $courseUniversity) {
			$courses[] = $mapper->course(array('id' => (int) $courseUniversity->course_id))->fetch();
		}
		return $courses;
	}
}