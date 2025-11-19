<?php

require_once APPPATH . '/config/environment.php';
require_once APPPATH . 'libraries/ma_modules/PHP/Auth/jwt/JwtAuth.php';

class JwtAdapter extends JwtAuth {
    private $keySessionUser;
    private $KeySessionToken;

    protected static $public_routes = [
        'login'
    ];

    public function __construct(){
        $this->keySessionUser  = Env::SESSION_USER_DATA;
        $this->KeySessionToken  = Env::SESSION_TOKEN;
        $key = Env::LOGIN_JWT_DECRYPT_KEY;
        $alg = Env::LOGIN_DECRYPT_ALG;

        parent::__construct($key,$alg,JwtAdapter::$public_routes);
    }

    public function check() {
        $keyDecodedData = "decodedData";

        try {
            log_message("INFO", "JWT Check -> Start");
            $accesData = parent::check();
            log_message("INFO", "JWT Check -> Finish");
        } catch (\Throwable $th) {
            log_message("INFO", "JWT Check -> FAIL");
            $this->errorHandler( $th->getMessage() );
        }
        
        if ( count($accesData) === 0 ){ //ruta publica o usuario no se pudo loguear
            return;
        }
        
        if ( !$accesData || !array_key_exists($keyDecodedData, $accesData) ){
            $this->errorHandler( "Usuario no identificado" );
        }
        // Guardar usuario en variable global para controladores
        $decodedData = (Array)$accesData[$keyDecodedData];
        $GLOBALS[ $this->keySessionUser ] = $decodedData["data"];
        $GLOBALS[ $this->KeySessionToken ] = $accesData["token"];
        log_message("INFO", "JWT Check -> keySessionUser -> OK");
    }

    private function errorHandler( String $msg ){
        log_message('Error', 'Auth Error[401]: ' . $msg );
        header("HTTP/1.1 401");
        echo "Error de autenticación: " . $msg;
        exit;
    }
}
