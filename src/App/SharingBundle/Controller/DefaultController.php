<?php

namespace App\SharingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('AppSharingBundle:Default:homepage.html.twig');
    }

    public function searchUniversityAction()
    {
        $mapper = $this->get('mapper');
        $name = $this->getRequest()->query->get('q');

        $searchResult = $mapper->university(array('name LIKE' => "%{$name}%"))->fetchAll();

        return $this->autocompleteResponse($name, $searchResult);
    }

    public function searchCourseByUniversityIdAction($universityId = 0)
    {
        $db = $this->get('db');
        $name = $this->getRequest()->query->get('q');

        $searchResult = $db->select('course.*')->from('course')
            ->join('university')
            ->where(array('course.name LIKE' =>"%{$name}%", 'university.id' => $universityId))
            ->fetchAll();

        return $this->autocompleteResponse($name, $searchResult);
    }

    protected function autocompleteResponse($query, array $suggestions)
    {
        $suggestions = array_map(function ($sugg) {
            return array('value' => $sugg->name, 'data' => $sugg->id);
        }, $suggestions);

        $response = array(
            'q' => $query,
            'suggestions' => $suggestions
        );

        return new JsonResponse($response);
    }
}