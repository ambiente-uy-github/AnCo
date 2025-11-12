<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . 'libraries/ma_modules/PHP/Auth/codeigniter3/SecureController.php';
require_once APPPATH . '/config/environment.php';

class SecureControllerAdapter extends SecureController {
    public function __construct( ) {
        parent::__construct( 26, Env::SESSION_USER_DATA, Env::SESSION_TOKEN );
	}
    
}