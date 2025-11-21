import { Injectable } from '@angular/core';
import { tipo_dato, TipoFrecuencia, TipoAmbiente } from '../../shared/constantes';
import { Empresa } from './empresas.servicio';
import { MessageService } from 'primeng/api';

export interface Planta {
    id: number;
    empresa_id: number;
    nombre: string;
}

export interface Emisor {
    id: number;
    plantaId: number;
    nombre: string;
    tabla: string;
}

export interface Parametro {
    id: number;
    nombre: string;
    codigo: string;
    codigoInterno: string;
    activo: boolean;
}

export interface ParametroContrato {
    matriz: string;
    parametro: Parametro;
    unidad: string;
    limite_inferior?: number;
    limite_superior?: number;
}

export interface Contrato {
    id: string;
    id_externo?: string;
    empresa: Empresa;
    planta: Planta;
    emisor: Emisor;
    fecha_desde: Date;
    tipo_dato: tipo_dato;
    frecuencia_envio: TipoFrecuencia;
    tiempo_tolerancia: number;
    ambiente: TipoAmbiente;
    activo: boolean;
    parametros: ParametroContrato[];
}

@Injectable({ providedIn: 'root' })
export class ContratoService {
    private _contratos: Contrato[];
    private _parametros: Parametro[];

    constructor(private messageService: MessageService) {
        this._parametros = this._getParametrosCatalogo();
        this._contratos = this._getSeedData();
    }

    private _getSeedData(): Contrato[] {
        return [
            {
                id: 'c-1000',
                empresa: {
                    id: '123124',
                    rut: '123124',
                    razon_social: 'Empresa Uno',
                    usuario: 'empresa_uno',
                    activo: true
                },
                planta: { id: 1, nombre: 'Planta Norte', empresa_id: 1 },
                emisor: { id: 1, plantaId: 1, nombre: 'Gateway-1', tabla: 'emisiones_agua' },
                fecha_desde: new Date('2024-05-01T10:00:00Z'),
                tipo_dato: 1,
                frecuencia_envio: 1,
                tiempo_tolerancia: 10,
                id_externo: 'EXT-123',
                ambiente: 1,
                activo: true,
                parametros: [
                    { matriz: 'agua', parametro: this._parametroByCodigo('silice')!, unidad: 'mg/L', limite_inferior: 0, limite_superior: 10 },
                    { matriz: 'agua', parametro: this._parametroByCodigo('n_org')!, unidad: 'mg/L', limite_inferior: 0, limite_superior: 5 }
                ]
            },
            {
                id: 'c-1001',
                empresa: {
                    id: '123124',
                    rut: '123124',
                    razon_social: 'Empresa Uno',
                    usuario: 'empresa_uno',
                    activo: true
                },
                planta: { id: 2, nombre: 'Planta Sur', empresa_id: 2 },
                emisor: { id: 2, plantaId: 2, nombre: 'Gateway-2', tabla: 'emisiones_aire' },
                fecha_desde: new Date('2024-06-15T08:30:00Z'),
                tipo_dato: 2,
                frecuencia_envio: 3,
                tiempo_tolerancia: 60,
                ambiente: 2,
                activo: false,
                parametros: [{ matriz: 'aire', parametro: this._parametroByCodigo('mo_cb')!, unidad: 'ng/m3', limite_inferior: 0, limite_superior: 0.1 }]
            }
        ];
    }

    private _getParametrosCatalogo(): Parametro[] {
        return [
            { id: 21, nombre: 'Silice', codigo: 'silice', codigoInterno: 'silice', activo: true },
            { id: 27, nombre: 'N orgánico', codigo: 'n_org', codigoInterno: 'n_org', activo: true },
            { id: 65, nombre: 'Sum. Hidroc. arom.', codigo: 's_hid_ar', codigoInterno: 's_hid_ar', activo: true },
            { id: 91, nombre: 'PCDD/PCDF - WHO', codigo: 'p_cdd-f_wh', codigoInterno: 'p_cdd_f_wh', activo: true },
            { id: 104, nombre: 'Sum PCBs tipo diox.', codigo: 's_pcb_diox', codigoInterno: 's_pcb_diox', activo: true },
            { id: 105, nombre: 'PCBs tipo diox.', codigo: 'pcb_diox', codigoInterno: 'pcb_diox', activo: true },
            { id: 112, nombre: 'Sum PCBs marcad.', codigo: 's_pcb_m', codigoInterno: 's_pcb_m', activo: true },
            { id: 113, nombre: 'MoCB', codigo: 'mo_cb', codigoInterno: 'mo_cb', activo: true }
        ];
    }

    getCatalogoParametros(): Promise<Parametro[]> {
        return Promise.resolve(this._parametros);
    }

    private _parametroByCodigo(codigo: string): Parametro | undefined {
        return this._parametros.find(p => p.codigo === codigo || p.codigoInterno === codigo);
    }

    obtener(): Promise<Contrato[]> {
        return Promise.resolve(this._contratos);
    }

    getById(id: string): Promise<Contrato | undefined> {
        const found = this._contratos.find((c) => c.id === id);
        return Promise.resolve(found);
    }

    // async crear(contrato: Contrato): Promise<Contrato> {

    // }

    // async actualizar(id: string, contrato: Contrato): Promise<Contrato> {

    // }

    // async eliminar(id: string): Promise<void> {

    // }

    // private _generateId(): string {

    // }

    public pasarAProduccion(id: string) {
        // En realidad habria que mostrar un modal para ver si todos los datos son correctos antes de hacer el cambio
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Contrato ${id} pasado a producción.` });
    }

    public solicitarPasajeAProduccion(id: string) {
        this.messageService.add({ severity: 'info', summary: 'Solicitud enviada', detail: `Solicitud para pasar a producción del contrato ${id} enviada.` });
    }

}
