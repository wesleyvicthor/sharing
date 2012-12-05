<?php
include __DIR__ .'/../bootstrap.php';
session_start();

$router = new \Respect\Rest\Router();
$mapper = new \Respect\Relational\Mapper(
	new \PDO('mysql:host=127.0.0.1;port=3306;dbname=sharing','root','wesley')
);
$container = new \Sharing\Model\Container();
$container->add('mapper', $mapper);
$container->add('twig', $twig);

$loginController = new \Sharing\Controller\Login($container);

$login = $router->get('/login', array($loginController, 'index'));
$router->post('/login', array($loginController, 'auth'));
$container->add('login', $login);

$auth = new \Sharing\Model\Auth($container);

$registerController = new \Sharing\Controller\Register($container);

$router->any('/cadastrar', array($registerController, 'register'));
$router->get('/universities', array($registerController, 'getUniversities'));
$router->get('/courses', array($registerController, 'getCourses'));

$root = $router->any('/', 'Sharing\Controller\Index', array($container))
	->by(array($auth, 'isGranted'));
$container->add('root', $root);





// respect rest issues
// perform a 301 redirect instead of redirect just the content