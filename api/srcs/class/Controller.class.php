<?php

namespace App\Controller ;

class Controller {
    private $_host;
    private $_dbname;
    private $_username;
    private $_password;
    private $_pdo;

    public function __construct($host, $dbname, $username, $password)
    {
        $this->_host = $host;
        $this->_dbname = $dbname;
        $this->_username = $username;
        $this->_password = $password;
    }

    public function connectDB()
    {
        try
        {
            $this->_pdo = new \PDO("mysql:host=".$this->_host.";dbname=".$this->_dbname, $this->_username, $this->_password);
            $this->_pdo->setAttribute(\PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, false);
            return 1;
        } 
        catch (\PDOException $th)
        {
            throw new \Exception("Erreur de connexion à la base de données : " . $th->getMessage());
        }
    }

    public function executeRequest($sqlrequest)
    {
        try
        {
            $recipesStatement = $this->_pdo->prepare($sqlrequest);
            $recipesStatement->execute();
            $recipes = $recipesStatement->fetchAll(\PDO::FETCH_ASSOC);
            header('Content-Type: application/json');        
            return json_encode($recipes);
        }
        catch (\PDOException $e)
        {
            return "Erreur de connexion à la base de données : " . $e->getMessage();
        }
    }
}