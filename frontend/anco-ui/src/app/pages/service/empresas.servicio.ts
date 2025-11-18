import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Empresa {
    id: string;
    rut: string;
    razon_social: string;
    usuario: string;
    activa: boolean;
}

@Injectable({ providedIn: 'root' })
export class EmpresasService {
    private _empresas: Empresa[];

    constructor(private http: HttpClient) {
        this._empresas = this.getEmpresasData();
    }

    getEmpresasData() {
        return [
            {
                id: '11',
                rut: '212121212121',
                razon_social: 'DINAGUA',
                usuario: 'dinagua',
                activa: true
            },
            {
                id: '13',
                rut: '313590820014',
                razon_social: 'OLECAR',
                usuario: 'olecar',
                activa: false
            },
            {
                id: '16',
                rut: '210078340012',
                razon_social: 'CURTIFRANCE',
                usuario: 'curtifrance',
                activa: true
            },
        ];
    }

    obtener() {
        return Promise.resolve(this._empresas);
    }

    obtenerPorId(id: string): Promise<Empresa | undefined> {
        const found = this._empresas.find((c) => c.id === id);
        return Promise.resolve(found);
    }

    // async crear(unidad: Empresa): Promise<Empresa> {

    // }

    // async actualizar(id: string, unidad: Empresa): Promise<Empresa> {

    // }

    // async eliminar(id: string): Promise<void> {

    // }

}
