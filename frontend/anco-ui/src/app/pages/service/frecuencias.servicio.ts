import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Frecuencia {
    id: string;
    nombre: string;
    minutos: number;
}

@Injectable({ providedIn: 'root' })
export class FrecuenciasService {
    private _frecuencias: Frecuencia[];

    constructor(private http: HttpClient) {
        this._frecuencias = this.getFrecuenciasData();
    }

    getFrecuenciasData() {
        return [
            {
                id: '1000',
                nombre: '1 MINUTO',
                minutos: 1
            },
            {
                id: '1001',
                nombre: '10 MINUTOS',
                minutos: 10
            },
            {
                id: '1002',
                nombre: '1 HORA',
                minutos: 60
            },
        ];
    }

    obtener() {
        return Promise.resolve(this._frecuencias);
    }

    // async crear(unidad: Frecuencia): Promise<Frecuencia> {

    // }

    // async actualizar(id: string, unidad: Frecuencia): Promise<Frecuencia> {

    // }

    // async eliminar(id: string): Promise<void> {

    // }

}
