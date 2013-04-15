<?php

namespace App\SharingBundle\User;

use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Respect\Relational\Mapper;

class Provider implements UserProviderInterface
{
    protected $mapper;

    public function setMapper(Mapper $mapper) {
        $this->mapper = $mapper;
    }

    public function loadUserByUsername($userEmail)
    {
        if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception('E-mail inválido!');
        }

        $user = $this->mapper->user(array('email' => $userEmail))
            ->fetch('\App\SharingBundle\Entities\User');

        if (!$user) {
            throw new UsernameNotFoundException(sprintf('Unable to find an active identified by "%s".', $userEmail));
        }
        
        return new Webservice($user->email, md5($user->passw), null, array('ROLE_'.$user->type));
    }

    public function refreshUser(UserInterface $user)
    {
        if (!$user instanceof Webservice) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', get_class($user)));
        }

        return $this->loadUserByUsername($user->getUsername());
    }

    public function supportsClass($class)
    {
        return $class === 'App\SharingBundle\User\Webservice';
    }
}