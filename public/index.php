<?php
include __DIR__ .'/../bootstrap.php';

$router = new \Respect\Rest\Router();
$mapper = new \Respect\Relational\Mapper(
	new \PDO('mysql:host=127.0.0.1;port=3306;dbname=sharing','root','wesley')
);
$container = new \Sharing\Model\Container();

$_SESSION['user.email'] = $_SESSION['user.passw'] = 'wesley';

$login = $router->any('/login', 'Sharing\Controller\Login', array($twig));

$container->add('login', $login);

$auth = new \Sharing\Model\Auth($container);

$router->any('/', 'Sharing\Controller\Index', array($twig))
	->by(array($auth, 'isGranted'));

// respect rest issues
// perform a 301 redirect instead of redirect just the content