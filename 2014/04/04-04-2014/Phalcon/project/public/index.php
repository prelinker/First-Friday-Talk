<?php

try {

    // Enregistrer l'autoloader de phalcon-php
    $loader = new \Phalcon\Loader();
    $loader->registerDirs(array(
        '../app/controllers/',
        '../app/models/'
    ))->register();

    //Création du DI
    $di = new Phalcon\DI\FactoryDefault();

    //On ajoute les éléments nécessaire à l'application dans le DI
    $di->set('view', function() {
        $view = new \Phalcon\Mvc\View();
        $view->setViewsDir('../app/views/');
        return $view;
    });

	// Etape 2 : Configuration de la DB
    	$di->set('db', function() {
		return new \Phalcon\Db\Adapter\Pdo\Mysql(array(
		    "host" => "localhost",
		    "username" => "root",
		    "password" => "none",
		    "dbname" => "db_demo"
		));
	});

    //Handle the request
    $application = new \Phalcon\Mvc\Application($di);

    echo $application->handle()->getContent();

} catch(\Phalcon\Exception $e) {
    echo "PhalconException: ", $e->getMessage();
} catch (Exception $ex) {
    echo "Exception : " . $ex->getMessage();
}
