<?php

namespace App\SharingBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\SharingBundle\Entities\User;
use App\SharingBundle\Entities\Teacher;
use App\SharingBundle\Entities\University;
use App\SharingBundle\Entities\Course;

class LoginController extends DefaultController
{
    public function indexAction()
    {
        return $this->render('AppSharingBundle:Default:index.html.twig');
    }

    public function activateAction($token)
    {
        if (empty($token)) {
            return new JsonResponse(array('fail' => 'Token de confirmação inválido.'));
        }

        $userType = 'STUDENT';
        if (strpos($token, '.') !== false) {
            list($token, $type) = explode('.', $token);
            $userType = base64_decode($type);
        }

        $email = base64_decode($token);
        $user = $this->userExists($email);

        if (!$user) {
            return new JsonResponse(array('fail' => 'Não foi encontrado usuário para o token: ' . $token));
        }

        if ($user->active == 1) {
            return new JsonResponse(array('fail' => 'Usuário já ativo.'));
        }

        if ($userType == 'TEACHER') {
            $user->active = 1;
            $mapper = $this->getMapper();
            $mapper->user->persist($user);
            $mapper->flush();
            return new JsonResponse(array('success' => "{$email} Ativado com sucesso!"));
        }

        $request = $this->getRequest()->request;
        $passw = trim($request->get('passw'));

        if (empty($passw)) {
            return new JsonResponse(array('fail' => 'Campo senha não pode estar vazio!'));
        }

        $passwCheck = trim($request->get('passw-check'));

        if ($passw != $passwCheck) {
            return new JsonResponse(array('fail' => 'Senhas digitas não são iguais.'));
        }

        if (strlen($passw) < 8) {
            return new JsonResponse(array('fail' => 'A senha deve conter no mínimo 8 caracteres.'));
        }

        $mapper = $this->getMapper();
        $user->active = 1;
        $user->passw = $passw;
        $mapper->user->persist($user);
        $mapper->flush();

        return new JsonResponse(array('success' => "{$email} Ativado com sucesso!"));
    }

    public function registerTeacherAction(Request $request)
    {
        $email = $request->request->get('email');
        $courseId = $request->request->get('course_id');
        $universityId = $request->request->get('university_id');
        $passw = trim($request->request->get('passw'));

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return new JsonResponse(array('fail' => 'Email inválido!'));
        }

        if ($user = $this->userExists($email)) {
            if ($user->active == 1) {
                return new JsonResponse(
                    array('fail' => 'Usuário já cadastrado e ativo.')
                );
            }
            $this->sendUserEmailConfirm($user);
            return new JsonResponse(
                array('fail' => 'Usuário já cadastrado porém não ativo. Link para ativação reenviado.')
            );
        }

        if (empty($passw) || strlen($passw) < 8) {
            return new JsonResponse(array('fail' => 'Senha deve ser > 8 caracteres.'));
        }

        if ($passw != trim($request->request->get('passw-check'))) {
            return new JsonResponse(array('fail' => ' Senha digitada não são iguais.'));
        }

        if (empty($universityId)) {
            $universityId = $this->createUniversity($request->request->get('university'));
        }

        if (empty($courseId)) {
            $courseId = $this->createCourse($universityId, $request->request->get('course'));
        }

        $teacher = new Teacher();
        $teacher->email = $email;
        $teacher->name = $email;
        $teacher->course_id = $courseId;
        $teacher->university_id = $universityId;
        $teacher->passw = $passw;

        $mapper = $this->getMapper();
        $mapper->user->persist($teacher);
        $mapper->flush();

        if (!empty($teacher->id)) {
            $this->sendUserEmailConfirm($teacher);
        }

        return new JsonResponse(
            array('success' => "Verifique sua caixa de email para confirmar o cadastro.")
        );
    }
}