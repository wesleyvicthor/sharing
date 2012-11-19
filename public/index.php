<?php
include __DIR__ .'/../bootstrap.php';

$router = new \Respect\Rest\Router();

$router->any('/', 'Sharing\Controller\Index', array($twig));

$router->any('/login', 'Sharing\Controller\Login', array($twig));