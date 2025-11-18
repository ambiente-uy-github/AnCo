<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

require_once APPPATH . '/libraries/php_modules/Response.php';

class Home extends RestController {
    	
    function __construct(){
        parent::__construct();

    }
   
    public function index_get(){   
        $this->response( Response::makeMessage( true, 'Home controller testssss', []), RestController::HTTP_OK ); 
        
        echo('Home controller');
	}
}