import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from './empresas.servicio';

export interface Departamento {
    id: string;
    nombre: string;
}

export interface Localidad {
    id: string;
    nombre: string;
    departamento: Departamento;
}

export interface Ubicacion {
    id: string;
    cord_x: number;
    cord_y: number;
    direccion: string;
    localidad: Localidad;
}

export interface Planta {
    id: string;
    nombre: string;
    tabla: string;
    ubicacion: Ubicacion;
    empresa: Empresa;
    activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class PlantasService {
    private _plantas: Planta[];

    constructor(private http: HttpClient) {
        this._plantas = this.getPlantasData();
    }

    getPlantasData() {
        return [
            {
                id: '1000',
                nombre: 'Planta 1',
                tabla: 'Tabla 1',
                ubicacion: {
                    id: '2000',
                    cord_x: 123.45,
                    cord_y: 67.89,
                    direccion: 'Calle Falsa 123',
                    localidad: {
                        id: '3000',
                        nombre: 'Localidad 1',
                        departamento: {
                            id: '4000',
                            nombre: 'Departamento 1'
                        }
                    }
                },
                empresa: {
                    id: '123124',
                    rut: '123124',
                    razon_social: 'Empresa Uno',
                    usuario: 'empresa_uno',
                    activo: true
                },
                activo: true
            },
            {
                id: '1001',
                nombre: 'Emisor 2',
                tabla: 'Tabla 2',
                ubicacion: {
                    id: '2001',
                    cord_x: 98.76,
                    cord_y: 54.32,
                    direccion: 'Avenida Siempre Viva 742',
                    localidad: {
                        id: '3001',
                        nombre: 'Localidad 2',
                        departamento: {
                            id: '4001',
                            nombre: 'Departamento 2'
                        }
                    }
                },
                empresa: {
                    id: '456789',
                    rut: '456789',
                    razon_social: 'Empresa Dos',
                    usuario: 'empresa_dos',
                    activo: false
                },
                activo: true
            },
            {
                id: '1002',
                nombre: 'Emisor 3',
                tabla: 'Tabla 3',
                ubicacion: {
                    id: '2002',
                    cord_x: 11.22,
                    cord_y: 33.44,
                    direccion: 'Boulevard de los Sueños Rotos 555',
                    localidad: {
                        id: '3002',
                        nombre: 'Localidad 3',
                        departamento: {
                            id: '4002',
                            nombre: 'Departamento 3'
                        }
                    }
                },
                empresa: {
                    id: '987654',
                    rut: '987654',
                    razon_social: 'Empresa Tres',
                    usuario: 'empresa_tres',
                    activo: true
                },
                activo: false
            },
        ];
    }

    obtener() {
        return Promise.resolve(this._plantas);
    }

    // async crear(unidad: Planta): Promise<Planta> {

    // }

    // async actualizar(id: string, unidad: Planta): Promise<Planta> {

    // }

    // async eliminar(id: string): Promise<void> {

    // }

}
