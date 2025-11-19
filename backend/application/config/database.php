<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '../../environment.php';

$active_group = 'default';
$query_builder = TRUE;

//OBTENGO AMBIENTES
$envDefault 	  = Env::getEnvironment( ENVIRONMENT );

$db['default'] = array(
	'dsn'	=> '',
	'hostname' => $envDefault->host,
	'username' => $envDefault->username,
	'password' => $envDefault->password,
	'database' => $envDefault->database,
	'dbdriver' => $envDefault->driver,
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => APPPATH.'cache/db/',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);
