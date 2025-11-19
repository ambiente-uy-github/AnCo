<?php
/**
 * ---------------------------------------------------------------
 * FRONT CONTROLLER - CodeIgniter 3 + Composer + REST Server + Env
 * ---------------------------------------------------------------
 */

// --------------------------------------------------------------------
// 1. CONFIGURACIÓN DE ENTORNO
// --------------------------------------------------------------------

if (!defined('ENVIRONMENT')) {
    define('ENVIRONMENT', 'development'); // Cambiar según servidor real
}

// Mostrar errores según entorno
switch (ENVIRONMENT) {
    case 'development':
        error_reporting(-1);
        ini_set('display_errors', 1);
        break;
    case 'testing':
    case 'production':
        ini_set('display_errors', 0);
        error_reporting(E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_STRICT);
        break;
    default:
        header('HTTP/1.1 503 Service Unavailable.', true, 503);
        echo '❌ El entorno no está configurado correctamente.';
        exit(1);
}

// --------------------------------------------------------------------
// 2. CARGA COMPOSER
// --------------------------------------------------------------------
$composer_autoload = __DIR__ . '/vendor/autoload.php';

if (file_exists($composer_autoload)) {
    require_once $composer_autoload;
} else {
    header('HTTP/1.1 503 Service Unavailable.', true, 503);
    echo '❌ Falta vendor/autoload.php. Ejecutá: <b>composer install</b>';
    exit(1);
}

// --------------------------------------------------------------------
// 3. CONFIGURAR RUTAS BASE
// --------------------------------------------------------------------
$system_path = 'system';
$application_folder = 'application';

if (realpath($system_path) !== false) {
    $system_path = realpath($system_path) . '/';
}
$system_path = rtrim($system_path, '/') . '/';

if (!is_dir($system_path)) {
    header('HTTP/1.1 503 Service Unavailable.', true, 503);
    echo '❌ Carpeta "system" no encontrada.';
    exit(3);
}

// Constantes globales
define('SELF', pathinfo(__FILE__, PATHINFO_BASENAME));
define('BASEPATH', str_replace("\\", "/", $system_path));
define('FCPATH', str_replace(SELF, '', __FILE__));
define('SYSDIR', basename(BASEPATH));

if (is_dir($application_folder)) {
    define('APPPATH', $application_folder . '/');
} else {
    define('APPPATH', BASEPATH . $application_folder . '/');
}

if (!defined('VIEWPATH')) {
    define('VIEWPATH', APPPATH . 'views/');
}

// --------------------------------------------------------------------
// 4. CARGAR CLASE ENV Y CONFIGURAR DB
// --------------------------------------------------------------------
$env_file = __DIR__ . '/environment.php';

if (!file_exists($env_file)) {
    header('HTTP/1.1 503 Service Unavailable.', true, 503);
    echo '❌ No se encontró el archivo <b>environment.php</b> en la raíz del proyecto.';
    exit(1);
}

require_once $env_file;

if (!class_exists('Env')) {
    header('HTTP/1.1 503 Service Unavailable.', true, 503);
    echo '❌ No se pudo cargar la clase Env desde environment.php.';
    exit(1);
}

$envConfig = Env::getEnvironment(ENVIRONMENT);

if (!$envConfig) {
    header('HTTP/1.1 503 Service Unavailable.', true, 503);
    echo '❌ No se encontró configuración para el entorno: ' . ENVIRONMENT;
    exit(1);
}

// Definir constantes de conexión
define('DB_HOST', $envConfig->host);
define('DB_NAME', $envConfig->database);
define('DB_USER', $envConfig->username);
define('DB_PASS', $envConfig->password);
define('DB_DRIVER', $envConfig->driver);
define('DB_PORT', $envConfig->port);

// --------------------------------------------------------------------
// 5. CONFIGURAR CORS GLOBAL
// --------------------------------------------------------------------
$cors = Env::getCorsConfig();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: " . implode(', ', $cors['allowed_cors_methods']));
header("Access-Control-Allow-Headers: " . implode(', ', $cors['allowed_cors_headers']));

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204); // No Content
    exit(0);
}

// --------------------------------------------------------------------
// 6. ARRANCAR CODEIGNITER
// --------------------------------------------------------------------
require_once BASEPATH . 'core/CodeIgniter.php';
