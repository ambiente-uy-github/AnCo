<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Model extends CI_Model {

    protected $table = '';
    protected $primaryKey = 'id';
    protected $allowedFields = [];

    public function getAll($limit = 100, $offset = 0) {
        return $this->db->get($this->table, $limit, $offset)->result();
    }

    public function getById($id) {
        return $this->db->where($this->primaryKey, $id)->get($this->table)->row();
    }

    public function insert($data) {
        $data = $this->filterFields($data);
        $this->db->insert($this->table, $data);
        return $this->db->insert_id();
    }

    public function updateById($id, $data) {
        $data = $this->filterFields($data);
        return $this->db->where($this->primaryKey, $id)->update($this->table, $data);
    }

    public function deleteById($id) {
        return $this->db->where($this->primaryKey, $id)->delete($this->table);
    }

    private function filterFields($data) {
        if (empty($this->allowedFields)) return $data;
        return array_intersect_key($data, array_flip($this->allowedFields));
    }
}
