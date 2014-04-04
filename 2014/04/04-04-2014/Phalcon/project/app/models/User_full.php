<?php

// Etape 9 : Le model phalcon

class User_full extends \Phalcon\Mvc\Model
{
	protected $user_id = null;

	protected $lastname = null;

	protected $firstname = null;

	protected $weight = 0;

	protected $height = 0;

	public function getUserId()
	{
		return $this->user_id;
	}

	public function getLastname()
	{
		return $this->lastname;
	}

	public function getFirstname()
	{
		return $this->firstname;
	}

	public function getWeight()
	{
		return $this->weight;
	}

	public function getHeight()
	{
		return $this->height;
	}

	public function setLastname(string $lastname)
	{
		$this->lastname = trim($lastname);
	}

	public function setFirstname(string $firstname)
	{
		$this->firstname = trim($firstname);
	}

	public function setWeight($weight)
	{
		$this->weight = weight;
	}

	public function setHeight($height)
	{
		$this->height = $height;
	}

	/**
	 * Hook after fetch
	 */
	public function afterFetch()
	{
		$this->weight = (int) $this->weight;
		$this->height = (int) $this->height;
	}

	// Liste des hooks existant
	/**
	 * beforeValidation
	 * beforeValidationOnCreate
	 * beforeValidationOnUpdate
	 * onValidationFails
	 * afterValidationOnCreate
	 * afterValidationOnUpdate
	 * afterValidation
	 * beforeSave
	 * beforeUpdate
	 * beforeCreate
	 * afterUpdate
	 * afterCreate
	 * afterSave
	 * beforeDelete
	 * afterDelete
	 **/

	// Events
	/**
    	 * notSave
    	 * onValidationFails
    	 **/

	// Gestion d'un master et d'un slave à la demande / gestion des transactions / gestion des relations de la base de données / logging low-level SQL / gestion de snapshots ....

	// Style de meta-data pour le models
	/**
	 * Annotations Strategy
	 * Manual Meta-Data (fonction metaData doit retourner un tableau)
	 * Mysql request meta-data
	 **/

	// Cache du meta-data
	/**
	 * Memory
	 * Session
	 * Apc
	 * XCache
	 * Files
	 **/

	/**
	 * Nom de la table correspondante
	 */
	public function getSource()
	{
		return "user";
	}
}
