<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {

    public function __construct() {
        parent::__construct();

        // Cabecera global para toda la API
        header('Content-Type: application/json; charset=utf-8');
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }

    // protected function respond($data, $status = 200) {
    //     http_response_code($status);
    //     echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    //     exit;
    // }
    
    static public function makeMessage( $ok, $description, $data ){
        return [
            "ok" => $ok,
            "description" => $description,
            "data" => $data,
        ];
    }
}