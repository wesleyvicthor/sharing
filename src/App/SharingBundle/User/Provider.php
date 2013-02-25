<?php

namespace App\SharingBundle\User;

use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;

class Provider implements UserProviderInterface
{
    public function loadUserByUsername($userEmail)
    {
        if ($userEmail != 'wesley') {
             throw new UsernameNotFoundException(sprintf('Unable to find an active identified by "%s".', $userEmail));
        }
        $password = 123;
        $salt = null;
        $roles = array('ROLE_USER');
        return new Webservice($userEmail, md5($password), $salt, $roles);
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