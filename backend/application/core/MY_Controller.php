<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

require_once APPPATH . 'libraries/php_modules/Response.php';

class MY_Controller extends RestController{

    public function __construct() {
        parent::__construct();

        // Cabecera global para toda la API
        header('Content-Type: application/json; charset=utf-8');
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
    }


    protected function get_input_data(){
    // Captura el raw input JSON
        $json = file_get_contents("php://input");

        if ($json) {
            $data = json_decode($json, true);

            // Si el JSON está mal formado
            if (json_last_error() !== JSON_ERROR_NONE) {
                return [];
            }
            return $data;
        }

        // Si no viene JSON, intentar POST normal
        return $this->input->post() ?? [];
    }
}