<?php

require_once APPPATH . '/libraries/php_modules/Cors.php';
// require_once APPPATH . '/config/environment.php';

class Response {
    
    static public function makeMessage( $ok, $description, $data ){
        return [
            "ok" => $ok,
            "description" => $description,
            "data" => $data,
        ];
    }

    static private function setHeader( $type = 'application/json' ){
        header('Content-Type: ' . $type . '; charset=utf-8');

        $cors = new Cors( Env::getCorsConfig() );
        $cors->setConfig();
    }

    static public function toJson( $data ){
        Response::setHeader();
        //SE PUEDE AGREGAR EL PARAMETRO JSON_FORCE_OBJECT PARA QUE LO DEVUELVA COMO UN OBJETO Y NO COMO UN ARRAY
        return json_encode( $data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
    }

    static public function toJsonError( $statusCode, $msg ){
        Response::setHeader();
        http_response_code( $statusCode );

        $data["errorCode"] = $statusCode;
        $data["errorText"] = $msg;

        //SE PUEDE AGREGAR EL PARAMETRO JSON_FORCE_OBJECT PARA QUE LO DEVUELVA COMO UN OBJETO Y NO COMO UN ARRAY
        return json_encode( $data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
    }

    static public function toJsonWithStatus( $ok, $description, $data ){
        Response::setHeader();
        
        $data = Response::makeMessage( $ok, $description, $data );
        //SE PUEDE AGREGAR EL PARAMETRO JSON_FORCE_OBJECT PARA QUE LO DEVUELVA COMO UN OBJETO Y NO COMO UN ARRAY
        return json_encode( $data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
    }

	static public function toJsonWithCountData( $data ){
        Response::setHeader();

        array_unshift( $data, [ "totalRegistros" => count($data) ] );

        //SE PUEDE AGREGAR EL PARAMETRO JSON_FORCE_OBJECT PARA QUE LO DEVUELVA COMO UN OBJETO Y NO COMO UN ARRAY
		return json_encode( $data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
	}

    static public function toXml( $ok, $description, $data ){
        $data = [
            "ok" => $ok,
            "description" => $description,
            "data" => $data,
        ];

        return false; //HAY QUE IMPLEMENTARLA 
    }
    
}
