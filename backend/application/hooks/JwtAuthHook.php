<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . 'libraries/Adapters/JwtAdapter.php';

class JwtAuthHook {
    
    public function check() {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            return;
        }
        
        $jwt = new JwtAdapter();
        $jwt->check();
    }
}