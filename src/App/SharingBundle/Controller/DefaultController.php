<?php

namespace App\SharingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('AppSharingBundle:Default:index.html.twig');
    }
}
