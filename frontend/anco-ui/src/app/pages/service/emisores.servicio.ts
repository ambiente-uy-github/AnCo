import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planta } from './contratos.servicio';

export interface Emisor {
    id: string;
    nombre: string;
    tabla: string;
    planta: Planta;
    activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class EmisoresService {
    private _emisores: Emisor[];

    constructor(private http: HttpClient) {
        this._emisores = this.getEmisoresData();
    }

    getEmisoresData(): Emisor[] {
        return [
            {
                id: '1000',
                nombre: 'Emisor 1',
                tabla: 'Tabla 1',
                planta: {
                    id: 1000,
                    empresa_id: 123124,
                    nombre: 'Planta 1'
                },
                activo: true
            },
        ];
    }

    obtener() {
        return Promise.resolve(this._emisores);
    }

    // async crear(unidad: Emisor): Promise<Emisor> {

    // }

    // async actualizar(id: string, unidad: Emisor): Promise<Emisor> {

    // }

    // async eliminar(id: string): Promise<void> {

    // }

}
