<?php

class EnvEjemplo {

    // CONFIGURACIÓN DE SERVIDORES
    const DB_SVR_DEV        = 'localhost';
    const DB_SVR_TESTING    = '10.0.0.20';
    const DB_SVR_PRODUCTION = '10.0.0.30';

    // -------------------------------------------------------------------------
    // CONFIGURACIÓN DE BASES DE DATOS
    // -------------------------------------------------------------------------
    private static function getAllEnvironments() {
        $host   = self::getDBServer(ENVIRONMENT);
        $driver = 'postgre'; // CodeIgniter usa 'postgre'
        $port   = '5432';

        return [
            'development' => [
                'name'     => 'development',
                'host'     => $host,
                'port'     => $port,
                'driver'   => $driver,
                'username' => 'user',
                'password' => 'xxx',
                'database' => 'recepcion_datos_admin',
            ],
            'testing' => [
                'name'     => 'testing',
                'host'     => self::DB_SVR_TESTING,
                'port'     => $port,
                'driver'   => $driver,
                'username' => 'user',
                'password' => 'xxx',
                'database' => 'recepcion_datos_admin',
            ],
            'production' => [
                'name'     => 'production',
                'host'     => self::DB_SVR_PRODUCTION,
                'port'     => $port,
                'driver'   => $driver,
                'username' => 'user',
                'password' => 'xxx',
                'database' => 'recepcion_datos_admin',
            ],
        ];
    }

    // -------------------------------------------------------------------------
    // CORS CONFIG
    // -------------------------------------------------------------------------
    public static function getCorsConfig() {
        return [
            'allowed_cors_headers' => [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'Access-Control-Request-Method',
                'Authorization',
            ],
            'allowed_cors_methods' => ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
            'allow_any_cors_domain' => true,
            'forced_cors_headers' => [],
        ];
    }

    // -------------------------------------------------------------------------
    // SERVIDOR DE BASE DE DATOS POR ENTORNO
    // -------------------------------------------------------------------------
    public static function getDBServer($env) {
        switch ($env) {
            case 'development': return self::DB_SVR_DEV;
            case 'testing':     return self::DB_SVR_TESTING;
            case 'production':  return self::DB_SVR_PRODUCTION;
            default:            return self::DB_SVR_DEV;
        }
    }

    // -------------------------------------------------------------------------
    // OBTENER CONFIGURACIÓN COMPLETA DE UN ENTORNO
    // -------------------------------------------------------------------------
    public static function getEnvironment($env) {
        $environments = self::getAllEnvironments();
        return isset($environments[$env]) ? (object) $environments[$env] : (object) $environments['development'];
    }
}
