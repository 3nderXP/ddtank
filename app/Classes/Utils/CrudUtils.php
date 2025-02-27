<?php

namespace App\Classes\Utils;

use PDO;
use ReflectionClass;

class CrudUtils {

    const MODEL_PATH = __DIR__."/../../Core/Model/Entities";
    const MODEL_PATH_NAMESPACE = "App\\Core\\Model\\Entities";

    protected PDO $pdo;
    protected string $entityName;
    private $order;
    private $limit;
    private $where;
    private Array $status = [];

    /**
     *
     * Get the value of order
     *
     * @return mixed
     *
    */

    public function getOrder() {

        return $this->order;

    }

    /**
     *
     * Set the value of order
     *
     * @param mixed  $order  
     *
    */

    public function setOrder($order) {

        $this->order = $order;

    }

    /**
     *
     * Get the value of limit
     *
     * @return mixed
     *
    */

    public function getLimit() {

        return $this->limit;

    }

    /**
     *
     * Set the value of limit
     *
     * @param mixed  $limit  
     *
    */

    public function setLimit($limit) {

        $this->limit = $limit;

    }

    /**
     *
     * Get the value of where
     *
     * @return mixed
     *
    */

    public function getWhere() {

        return $this->where;

    }

    /**
     *
     * Set the value of where
     *
     * @param mixed  $where  
     *
    */

    public function setWhere($where) {

        $this->where = $where;

    }

    /**
     *
     * Get the value of Status
     * 
     * @return array
     *
    */

    public function getStatus(){

        return $this->status;

    }

    /**
     *
     * Set the value of status
     *
     * @param array $status
     *
    */

    protected function setStatus(string $status, string $message = null, $code = 0) {

        $this->status = [
            "status" => $status,
            "message" => $message,
            "code" => $code
        ];

    }

    /**
     * 
     * @param array $array fields Array containing the fields and values ​​of the model
     * 
     * @return object Returns the model object
     * 
    */

    protected function createModel(Array $array) : Object {

        $arrayFields = array_keys($array);

        $methods = array_map(function ($field) {

            return "set".implode("", array_map(function ($string) {

                return ucfirst($string);
                
            }, explode("_", $field)));

        }, $arrayFields);

        $className = self::MODEL_PATH_NAMESPACE."\\".$this->entityName;
        $obj = new $className;

        foreach($methods as $index => $method){
            
            if(method_exists($obj, $method)) $obj->$method($array[$arrayFields[$index]]);

        }

        return $obj;

    }

    public function modelToArray(Object $model, array $acceptFields = [], array $excludeFields = []){

        $array = [];

        $properties = (new ReflectionClass($model))->getProperties();

        if(!empty($acceptFields)) {

            $properties = array_filter($properties, fn ($prop) => in_array($prop->getName(), $acceptFields));

        }

        if(!empty($excludeFields)) {

            $properties = array_filter($properties, fn ($prop) => !in_array($prop->getName(), $excludeFields));

        }

        foreach($properties as $propertie){

            $method = "get".ucfirst($propertie->getName());

            $array[$propertie->getName()] = method_exists($model, $method) ? call_user_func([$model, $method]) : null;

        }

        return $array;

    }

    protected function apiParamsWithKeys(Array $keys, Array $params){
        
        if(!empty($params)){

            $newParams = [];
            
            foreach($keys as $index => $key){
    
                $newParams[$key] = isset($params[$index]) ? $params[$index] : null;
    
            }
            
            return $newParams;

        }

    }

}