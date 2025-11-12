<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;

// require_once APPPATH . '/libraries/php_modules/Request.php';
require_once APPPATH . '/libraries/php_modules/Response.php';
// require_once APPPATH . '/libraries/ma_modules/PHP/Auth/IAuth.php';
// require_once APPPATH . '/libraries/ma_modules/PHP/Auth/AuthAdminis.php';

class Home extends RestController {
    	
    function __construct(){
        parent::__construct();
    }
   
    public function index_get(){   
        $this->response( Response::makeMessage( true, 'Home controller test', []), RestController::HTTP_OK ); 
        echo('HOme controller');
	}
}