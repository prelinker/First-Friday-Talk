<?php

// Etape 1 : Création de votre controller
class DemoController extends \Phalcon\Mvc\Controller
{
	public function initialize()
	{	
		// on ajoute un css
		$this->assets->addCss('css/default.css');
	}
	
	public function indexAction()
	{
		echo '<h4>Hello Demo</h4>';
	}

	// Etape 5 : Récupération des utilisateurs
	public function userAction()
	{
		$users = User::find();

		foreach ($users as $user) {
			echo $user->user_id . ' : ' . $user->lastname . ' ' . $user->firstname . ', ' . $user->weight . ', ' . $user->height . ' <a href="/demo/edit?id=' . $user->user_id . '">Edit</a><br />';
		}
		
	}

	// Etape 6 : Structure des vues
	public function viewAction()
	{

	}

	// Etape 7 : Formulaire d'ajout
	public function addAction()
	{

		if ($this->request->isPost() === true) {
			$user = new User();

			//Store and check for errors
			$success = $user->save($this->request->getPost(), array('lastname', 'firstname', 'height', 'weight'));

			if ($success) {
			    	echo "Thanks for registering!";
				$this->view->disable();
			} else {
				// passage à la vue des erreurs rencontrées
				$this->view->setVar("form_errors", $user->getMessages());
			}
		}
	}

	# Etape 10 : formulaire d'enregistrement
	public function editAction()
	{
		// $this->request->getQuery("id");
		$user_id = (int) $this->request->getQuery("id", 'int'); // je lui dis de nettoyer la variable pour être un int obligatoirement
		
		$user = User::findFirst($user_id);

		if ($user instanceof User) {
			if ($this->request->isPost()) {
				$isSuccess = $user->save($this->request->getPost(), array('lastname', 'firstname', 'height', 'weight'));

				if ($isSuccess === true) {
			    		echo "Thanks for updating!";
					$this->view->disable();
				} else {
					$this->view->setVar("form_errors", $user->getMessages());
				}
			}

			$this->view->setVar('user_id', $user_id);			

			$this->tag->setDefault('lastname', $user->lastname);
			$this->tag->setDefault('firstname', $user->firstname);
			$this->tag->setDefault('weight', $user->weight);
			$this->tag->setDefault('height', $user->height);
		} else {
			echo "L'utilisateur demandé n'existe pas.";
			$this->view->disable();
		}
	}
}
