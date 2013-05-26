<?php

namespace App\SharingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use App\SharingBundle\Entities\User;
use App\SharingBundle\Entities\Group;
use App\SharingBundle\Entities\Course;
use App\SharingBundle\Entities\Teacher;
use App\SharingBundle\Entities\UserGroup;
use App\SharingBundle\Entities\University;
use Respect\Relational\Sql;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('AppSharingBundle:Default:homepage.html.twig');
    }

    public function filesAction()
    {
        $date = new \DateTime('now');
        $data = array(
            array('fileicon' => 'icone', 'filetype' => 'pdf', 'filename' => 'my file', 'datetime' => $date->format('d/m/Y H:i:s')),
            array('fileicon' => 'icone', 'filetype' => 'pdf', 'filename' => 'my file', 'datetime' => $date->format('d/m/Y H:i:s')),
            array('fileicon' => 'icone', 'filetype' => 'pdf', 'filename' => 'my file', 'datetime' => $date->format('d/m/Y H:i:s')),
            array('fileicon' => 'icone', 'filetype' => 'pdf', 'filename' => 'my file', 'datetime' => $date->format('d/m/Y H:i:s')),
            array('fileicon' => 'icone', 'filetype' => 'pdf', 'filename' => 'my file', 'datetime' => $date->format('d/m/Y H:i:s')),
            array('fileicon' => 'icone', 'filetype' => 'pdf', 'filename' => 'my file', 'datetime' => $date->format('d/m/Y H:i:s')),
            array('fileicon' => 'icone', 'filetype' => 'pdf', 'filename' => 'my file', 'datetime' => $date->format('d/m/Y H:i:s'))
        );

        return new JsonResponse($data);
    }

    public function userAction(Request $request)
    {
        $userId = $this->getUser()->getId();
        $mapper = $this->getMapper();
        $user = $mapper->user(array('id' => $userId))->fetch();
        $user->name = $request->request->get('username');
        $mapper->user->persist($user);
        $mapper->flush();

        return new JsonResponse(array('success' => 'Nome do usuário atualizado!'));
    }

    public function redirectAction()
    {
        return $this->redirect($this->generateUrl('app_sharing_homepage'));
    }

    public function groupsAction()
    {
        $mapper = $this->getMapper();
        $userId = $this->getUser()->getId();
        $loggedUser = $mapper->user(array('id' => $userId))->fetch();

        $userGroups = $mapper->userGroup($mapper->groups, array('user_id' => $userId))
            ->fetchAll();

        $ownerGroups = $mapper->userGroup($mapper->groups(array('owner_id' => $userId)))->fetchAll(Sql::groupBy('groups.id'));

        // select g.name from groups g LEFT JOIN userGroup ug ON g.id = ug.groups_id where g.owner_id = 1 group by g.id;
        // get groups by owner
        $userGroups = array_merge($userGroups, $ownerGroups);
        $groups = array();
        foreach ($userGroups as $group) {
            $usersGroup = $mapper->userGroup(
                $mapper->user,
                array(
                    'groups_id' => $group->groups_id->id,
                    'university_id' => $loggedUser->university_id,
                    'course_id' => $loggedUser->course_id,
                    'user_id <>' => $userId
                )
            )->fetchAll();

            $users = array();
            foreach ($usersGroup as $userGroup) {
                $users[] = array(
                    'name' => $userGroup->user_id->name,
                    'photo' => ''
                );
            }

            $groups[] = array(
                'owner' => ($group->groups_id->owner_id == $userId),
                'id' => (int) $group->groups_id->id,
                'name' => $group->groups_id->name,
                'list' => $users
            );
        }

        return new JsonResponse($groups);
    }

    public function groupAction($id)
    {
        $mapper = $this->getMapper();
        $group = $mapper->groups(array('id' => $id))->fetch();
        $group->name = $this->getRequest()->request->get('name');
        $mapper->groups->persist($group);
        $mapper->flush();
        return new  JsonResponse(array('success' => 'Nome do grupo atualizado.'));
    }

    public function searchUniversityAction()
    {
        $mapper = $this->getMapper();
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
            ->on('university.id = course.university_id')
            ->where(array('course.name LIKE' =>"%{$name}%", 'university.id' => $universityId))
            ->fetchAll();
        return $this->autocompleteResponse($name, $searchResult);
    }

    public function registerGroupAction(Request $request)
    {
        $courseId = $request->request->get('course_id');
        $universityId = $request->request->get('university_id');
        $groupName = trim($request->request->get('group'));
        $emails = trim($request->request->get('emails'));

        $universityName = trim($request->request->get('university'));
        $courseName = trim($request->request->get('course'));

        if (empty($universityName)) {
            return new JsonResponse(array('fail' => 'Você deve especificar uma universidade.'));
        }

        if (empty($courseName)) {
            return new JsonResponse(array('fail' => 'Você deve especificar um curso.'));
        }

        if (empty($emails)) {
            return new JsonResponse(array('fail' => 'Lista de emails não pode ser vazia.'));
        }

        if (empty($groupName)) {
            return new JsonResponse(array('fail' => 'Você deve especificar o nome da turma.'));
        }

        if (empty($universityId)) {
            $universityId = $this->createUniversity($universityName);
        }

        if (empty($courseId)) {
            $courseId = $this->createCourse($universityId, $courseName);
        }
        $emails = explode(';', $emails);
        $filteredEmails = $this->handleEmailList($emails);

        $mapper = $this->getMapper();
        $group = new Group();
        $group->name = $groupName;
        $group->owner_id = $this->get('session')->get('user.id');
        $mapper->groups->persist($group);
        $mapper->flush();

        if (!$group->id) {
            return false;
        }

        $failToCreate = array();
        $success = array();
        $toCreate = array_merge($filteredEmails['registeredUsers'], $filteredEmails['newUsers']);
        foreach ($toCreate as $user) {
            $created = $this->createUserGroup($user, $group->id, $universityId, $courseId);
            $email = isset($user->email) ? $user->email : $user;
            if (!$created) {
                $failToCreate[] = $email;
            }
            $success[] = $email;
        }

        return new JsonResponse(array('success' => implode(', ', $success) . ' cadastrado(s) com sucesso.'));
    }

    protected function createUserGroup($email, $groupId, $universityId, $courseId)
    {
        $mapper = $this->getMapper();

        $user = $email;
        if (!$user instanceof \StdClass) {
            $user = new User();
            $user->name = $user->email = $email;
            $user->university_id = $universityId;
            $user->course_id = $courseId;
            $user->type = 'STUDENT';

            $mapper->user->persist($user);
            $mapper->flush();

            if (!$user->id) {
                return false;
            }
            // it must return true or false to validate email sent.
            $this->sendUserEmailConfirm($user->email);
        }

        $userGroup = new UserGroup();
        $userGroup->groups_id = $groupId;
        $userGroup->user_id = $user->id;
        $userGroup->university_id = $universityId;
        $userGroup->course_id = $courseId;

        $mapper->userGroup->persist($userGroup);
        $mapper->flush();

        if (!$userGroup->id) {
            return false;
        }

        return true;
    }

    protected function handleEmailList(array $emails)
    {
        $invalidEmails = array();
        $asTeacher = array();
        $registeredUsers = array();
        $newUsers = array();

        $mapper = $this->getMapper();

        foreach ($emails as $email) {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $invalidEmails[] = $email;
            }

            if ($user = $this->userExists($email)) {
                if ($user->type == 'TEACHER') {
                    $asTeacher[] = $user;
                }
                $registeredUsers[] = $user;
            }
            $newUsers[] = $email;
        }

        return array(
            'invalidEmails' => $invalidEmails,
            'registeredAsTeacher' => $asTeacher,
            'registeredUsers' => $registeredUsers,
            'newUsers' => $newUsers
        );
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

    protected function createCourse($universityId, $courseName)
    {
        $course = new Course();
        $course->name = $courseName;
        $course->university_id = $universityId;

        $mapper = $this->getMapper();
        $mapper->course->persist($course);
        $mapper->flush();

        return $course->id;
    }

    protected function createUniversity($universityName)
    {
        $university = new University();
        $university->name = $universityName;

        $mapper = $this->getMapper();
        $mapper->university->persist($university);
        $mapper->flush();

        return $university->id;
    }

    protected function userExists($email)
    {
        $mapper = $this->getMapper();
        return $mapper->user(array('email' => $email))
            ->fetch();
    }

    protected function sendUserEmailConfirm($user)
    {
        $email = $user;
        if ($user instanceof \StdClass) {
            $email = $user->email;
        }

        $token = base64_encode($email);
        if (isset($user->type) && $user->type == 'TEACHER') {
            $token .= '.' . base64_encode('TEACHER');
        }

        try {
            $message = \Swift_Message::newInstance();
            $message->setSubject('Sharing no reply')
                ->setFrom('noreplay@sharing.com')
                ->setTo($email)
                ->setBody(
                    sprintf(
                        "Click no link para ativar o cadastro http://sharing.com/activate?token=%s",
                        $token
                    )
                );
            $this->get('mailer')->send($message);
        } catch (\Exception $e) {
               
        }
    }

    protected function getMapper()
    {
        $mapper = $this->get('mapper');
        $mapper->entityNamespace = '\\App\\SharingBundle\\Entities';
        return $mapper;
    }
}
