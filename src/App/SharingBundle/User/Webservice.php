<?php

namespace App\SharingBundle\User;

use Symfony\Component\Security\Core\User\UserInterface;

class Webservice implements UserInterface
{
    private $userEmail;
    private $password;
    private $salt = 123;
    private $roles = array();
    private $id;

    public function __construct($userEmail, $password, $salt, array $roles)
    {
        $this->userEmail = $userEmail;
        $this->password = $password;
        $this->salt = $salt;
        $this->roles = $roles;
    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    
        return $this;
    }

    public function getRoles()
    {
        return $this->roles;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getSalt()
    {
        return $this->salt;
    }

    public function getUsername()
    {
        return $this->userEmail;
    }

    public function eraseCredentials()
    {
    }

    public function equals(UserInterface $user)
    {
        if (!$user instanceof WebserviceUser) {
            return false;
        }

        if ($this->password !== $user->getPassword()) {
            return false;
        }

        if ($this->getSalt() !== $user->getSalt()) {
            return false;
        }

        if ($this->userEmail !== $user->getuserEmail()) {
            return false;
        }

        return true;
    }
}