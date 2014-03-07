![image](http://www.hashicorp.com/images/blog/a-new-look-for-vagrant/logo_wide-cab47086.png =200x)

Aujourd'hui les fichiers de config allègent projets

- en conservant les dépendances (composer, npm)
- en respectant les besoins en outils (less, grunt)

... sans inclure ni dépendances ni outils au projet (dépot git)


> Il n'y a que l'archi qu'on ne peut pas trimballer

## Vagabond

    - simple
    - portable
    - clonable


## Install

Mitchell Hashimoto  
Provider : Virtualbox, Vmware, Aws, etc...

## VM1

- vagrant init 
	- `Vagrantfile`
- vagrant up
	- `fail`
	- `vagrantbox.es`
- vagrant box list
	- `precise64`
- vagrant up
- vagrant ssh
	- `uname -a`
	- `aptitude search php`
- vagrant halt
- vagrant destroy

## VM2

- `box webdev`
- `forward port 80`
- `shared folder`

## VM3

- `provision`
- `ansible playbook`
- vagrant package

## VM4

- multiple vms

## Bilan

- Bénefices
    - os au choix
    - vm custom (ram, cpu, ...)
    - configuration du réseau
    - shared folders (local sources)
    - provisioning
    - vagrantfile par projet

- Possibilités
    - phalcon
    - nginx + php-fpm 5.6 alpha3
    - fusion + hhvm
	- En dev comme en prod
