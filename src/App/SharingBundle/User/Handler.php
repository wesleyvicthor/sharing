<?php

namespace App\SharingBundle\User;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class Handler
implements AuthenticationSuccessHandlerInterface,
           AuthenticationFailureHandlerInterface
{
    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        if ($request->isXmlHttpRequest()) {
            $user = $token->getUser();
            return new JsonResponse(
                array('username' => $user->getUsername(), 'userRoles' => $user->getRoles(), 'id' => $user->getId())
            );
        }
        return new JsonResponse(array(), 400);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        if ($request->isXmlHttpRequest()) {
            $message = $exception->getMessage();
            if ('Bad credentials' == $message) {
                $message = 'Email ou Senha inválida!';
            }
            return new JsonResponse(array('fail' => $message));
        }
        return new JsonResponse(array(), 400);
    }
}