<?php

Class Cors {
    private $corsConfig;

    public function __construct( Array $config ){
        $this->corsConfig = $config;
    }
    
    public function setConfig(){
        $config = $this->corsConfig;

        // Convert the config items into strings
        $allowed_headers = implode(', ', $config['allowed_cors_headers']);
        $allowed_methods = implode(', ', $config['allowed_cors_methods']);

        // If we want to allow any domain to access the API
        if ($config['allow_any_cors_domain'] === true) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Headers: ' . $allowed_headers);
            header('Access-Control-Allow-Methods: ' . $allowed_methods);
        } else {
            // We're going to allow only certain domains access
            // Store the HTTP Origin header
            $origin = $_SERVER['HTTP_ORIGIN'];
            if ($origin === null) {
                $origin = '';
            }
            
            // If the origin domain is in the allowed_cors_origins list, then add the Access Control headers
            if ( in_array( $origin, $config['allowed_cors_origins'] ) ) {
                header('Access-Control-Allow-Origin: ' . $origin);
                header('Access-Control-Allow-Headers: '. $allowed_headers);
                header('Access-Control-Allow-Methods: '. $allowed_methods);
            }
        }

        // If there are headers that should be forced in the CORS check, add them now
        if (count($config['forced_cors_headers']) > 0) {
            foreach ($config['forced_cors_headers'] as $header => $value) {
                header($header . ': ' . $value);
            }
        }

        // If the request HTTP method is 'OPTIONS', kill the response and send it to the client
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method === 'OPTIONS') {
            exit;
        }
    }

}