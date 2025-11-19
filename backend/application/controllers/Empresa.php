<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use chriskacerguis\RestServer\RestController;


class Empresa extends MY_Controller{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('Empresa_model', 'empresa');
    }

    /**
     * GET /empresa
     * Lista todas las empresas
     */
    public function index_get($id = null){
        if ($id) {
            $data = $this->empresa->get_by_id($id);
            if ($data) {
            $this->response( Response::makeMessage( true, 'Empresa encontrada', $data), RestController::HTTP_OK ); 
            }
            $this->response( Response::makeMessage( false, 'Empresa no encontrada', []), RestController::HTTP_BAD_REQUEST ); 
        }

        $data = $this->empresa->get_all();
        $this->response( Response::makeMessage( true, 'Listado de empresas', $data), RestController::HTTP_OK ); 
    }

    /**
     * POST /empresa
     * Crea una nueva empresa
     */
    public function index_post(){
        $input = $this->get_input_data();

        // Campos obligatorios
        $required = ['razon_social', 'rut', 'activo', 'usuario', 'pass'];

        foreach ($required as $field) {
            if (!isset($input[$field]) || $input[$field] === '') {
                return $this->response(
                    Response::makeMessage(false, "El campo '$field' es obligatorio", []),
                    RestController::HTTP_BAD_REQUEST
                );
            }
        }

        // Normalización de datos
        $data = [
            'razon_social' => trim($input['razon_social']),
            'rut'          => trim($input['rut']),
            'activo'       => (int)$input['activo'],
            'usuario'      => trim($input['usuario']),
            'pass'         => password_hash($input['pass'], PASSWORD_BCRYPT),
        ];

        // 👉 El insert REAL se hace en el Modelo
        $insert_id = $this->empresa->insert($data);

        if ($insert_id) {
            return $this->response(
                Response::makeMessage(true, 'Empresa creada correctamente', ['id' => $insert_id]),
                RestController::HTTP_CREATED
            );
        }

        return $this->response(
            Response::makeMessage(false, 'No se pudo crear la empresa', []),
            RestController::HTTP_INTERNAL_ERROR
        );
    }

    /**
     * PUT /empresa/{id}
     * Actualiza una empresa existente
     */
    public function index_put($id = null)
    {
        if (!$id) {
            return $this->response(
                Response::makeMessage(false, 'ID de empresa requerido', []),
                RestController::HTTP_BAD_REQUEST
            );
        }

        $input = $this->get_input_data();

        if (empty($input)) {
            return $this->response(
                Response::makeMessage(false, 'No se recibieron datos para actualizar', []),
                RestController::HTTP_BAD_REQUEST
            );
        }

        $updated = $this->empresa->update($id, $input);

        if ($updated) {
            return $this->response(
                Response::makeMessage(true, 'Empresa actualizada correctamente', []),
                RestController::HTTP_OK
            );
        }

        return $this->response(
            Response::makeMessage(false, 'No se pudo actualizar la empresa', []),
            RestController::HTTP_INTERNAL_ERROR
        );
    }

    /**
     * DELETE /empresa/{id}
     * Elimina una empresa
    */
    public function index_delete($id = null)
    {
        if (!$id) {
            return $this->response(
                Response::makeMessage(false, 'ID de empresa requerido', []),
                RestController::HTTP_BAD_REQUEST
            );
        }

        $deleted = $this->empresa->delete($id);

        if ($deleted) {
            return $this->response(
                Response::makeMessage(true, 'Empresa eliminada correctamente', []),
                RestController::HTTP_OK
            );
        }

        return $this->response(
            Response::makeMessage(false, 'No se pudo eliminar la empresa', []),
            RestController::HTTP_INTERNAL_ERROR
        );
    }

}