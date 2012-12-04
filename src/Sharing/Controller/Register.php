<?php

namespace Sharing\Controller;

use Respect\Validation\Validator as v;

class Register extends Controller
{
	public function post()
	{
		$emails = explode(';', $_POST['email-list']);
		$mapper = $this->container->get('mapper');

		$user = new StdClass();
		$user->email = $_POST['email'];
		$user->passw = $_POST['passw'];
		$user->type = $_POST['type'];

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
}