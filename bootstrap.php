<?php

error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('UTC');

if (!($autoload = @include __DIR__ . '/vendor/autoload.php')) {

    set_include_path(implode(PATH_SEPARATOR, array(
        __DIR__ . '/src',
        get_include_path(),
    )));

    spl_autoload_register(
        function($className) {
            $filename = strtr($className, '\\', DIRECTORY_SEPARATOR) . '.php';
            foreach (explode(PATH_SEPARATOR, get_include_path()) as $path) {
                $path .= DIRECTORY_SEPARATOR . $filename;
                if (is_file($path)) {
                    require_once $path;
                    return true;
                }
            }
            return false;
        }
    );
}

Twig_Autoloader::register();

$loader = new Twig_Loader_Filesystem(__DIR__.'/src/Sharing/View/');
$twig = new Twig_Environment($loader/**, array('cache' => __DIR__ .'/cache/templates')*/);