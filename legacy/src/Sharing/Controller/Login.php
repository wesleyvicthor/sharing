<?php

namespace Sharing\Controller;

use Respect\Validation\Validator as v;

class Login extends Controller
{
	public function index()
	{
		try {
			$this->render('login/index.html.twig');
		} catch (\Exception $e) {

		}
	}

	public function auth()
	{
		$email = $_POST['email'];
		$passw = $_POST['passw'];
		$type = $_POST['type'];

		try {
			v::allOf(
				v::key('email', v::email()),
				v::key('passw', v::notEmpty()->noWhitespace()->length(4, 8))
			)->assert($_POST);

		} catch (\InvalidArgumentException $e) {
			$errors = $e->findMessages(
				array(
					'email' => 'Email inválido!',
					'passw' => 'Senha não pode conter espaços e deve conter entre 4 e 8 caracteres!',
				)
			);
			return json_encode($this->showMessage($errors, self::ERROR));
		}

		$mapper = $this->container->get('mapper');
		$params = array('email' => $email, 'passw' => $passw);
		$user = $mapper->user($params)->fetch();
		if (!$user) {
			return sprintf(json_encode(array_merge(array('auth' => $user, 'type' => $type), $params)));
		}

		$_SESSION['user.passw'] = $passw;
		$_SESSION['user.email'] = $email;
		$_SESSION['user.type'] = $user->type;

		return json_encode(array('redirect' => '/'));
	}
}