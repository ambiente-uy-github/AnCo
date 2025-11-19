<?php

require_once APPPATH . 'libraries/DefConstantesBD.php';

class Empresa_model extends CI_Model
{
    protected $table = 'empresa';
    protected $primaryKey = 'id';
    protected $allowedFields = ['razon_social','rut','activo','usuario','pass'];

    public function __construct()
    {
        parent::__construct();

    }

    /**
     * Devuelve todas las empresas activas o no
     */
    public function get_all(){
        return $this->db->get($this->table)->result_array();
    }

    /**
     * Devuelve una empresa por ID
     */
    public function get_by_id($id){
        return $this->db->where($this->primaryKey, $id)->get($this->table)->row_array();
    }

    /**
     * Inserta una empresa nueva
     */
    public function insert($data){
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }

    /**
     * Actualiza una empresa
     */
    public function update($id, $data){
        return $this->db->where($this->primaryKey, $id)->update($this->table, $data);
    }

    /**
     * Elimina una empresa
     */
    public function delete($id){
        return $this->db->where($this->primaryKey, $id)->delete($this->table);
    }
}
