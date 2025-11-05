import { Injectable } from '@angular/core';
import { TipoDato, TipoFrecuencia, TipoAmbiente } from '../../shared/constantes';

export interface Parametro {
    id: number;
    nombre: string;
    codigo: string;
    codigo_interno: string;
    activo: boolean;
}

export interface ParametroContrato {
    matriz: string;
    parametro: Parametro;
    unidad: string;
    limiteInferior?: number;
    limiteSuperior?: number;
}

export interface Contrato {
    id?: string;
    idExterno?: string;
    empresa: string;
    planta: string;
    emisor: string;
    fechaDesde: string;
    tipoDato: TipoDato;
    frecuenciaEnvio: TipoFrecuencia;
    tiempoTolerancia: number;
    ambiente?: TipoAmbiente;
    activo?: boolean;
    parametros?: ParametroContrato[];
}

@Injectable({ providedIn: 'root' })
export class ContratoService {
    private _contratos: Contrato[];
    private _parametros: Parametro[];

    constructor() {
        this._parametros = this._getParametrosCatalogo();
        this._contratos = this._getSeedData();
    }

    private _getSeedData(): Contrato[] {
        return [
            {
                id: 'c-1000',
                empresa: 'Empresa A',
                planta: 'Planta 1',
                emisor: 'Sensor-01',
                fechaDesde: '2024-01-01T00:00:00Z',
                tipoDato: 1,
                frecuenciaEnvio: 1,
                tiempoTolerancia: 10,
                idExterno: 'EXT-123',
                activo: true,
                parametros: [
                    { matriz: 'agua', parametro: this._parametroByCodigo('silice')!, unidad: 'mg/L', limiteInferior: 0, limiteSuperior: 10 },
                    { matriz: 'agua', parametro: this._parametroByCodigo('n_org')!, unidad: 'mg/L', limiteInferior: 0, limiteSuperior: 5 }
                ]
            },
            {
                id: 'c-1001',
                empresa: 'Empresa B',
                planta: 'Planta Central',
                emisor: 'Gateway-7',
                fechaDesde: '2024-06-15T08:30:00Z',
                tipoDato: 2,
                frecuenciaEnvio: 3,
                tiempoTolerancia: 60,
                activo: false,
                parametros: [{ matriz: 'aire', parametro: this._parametroByCodigo('mo_cb')!, unidad: 'ng/m3', limiteInferior: 0, limiteSuperior: 0.1 }]
            }
        ];
    }

    private _getParametrosCatalogo(): Parametro[] {
        return [
            { id: 21, nombre: 'Silice', codigo: 'silice', codigo_interno: 'silice', activo: true },
            { id: 27, nombre: 'N orgánico', codigo: 'n_org', codigo_interno: 'n_org', activo: true },
            { id: 65, nombre: 'Sum. Hidroc. arom.', codigo: 's_hid_ar', codigo_interno: 's_hid_ar', activo: true },
            { id: 91, nombre: 'PCDD/PCDF - WHO', codigo: 'p_cdd-f_wh', codigo_interno: 'p_cdd_f_wh', activo: true },
            { id: 104, nombre: 'Sum PCBs tipo diox.', codigo: 's_pcb_diox', codigo_interno: 's_pcb_diox', activo: true },
            { id: 105, nombre: 'PCBs tipo diox.', codigo: 'pcb_diox', codigo_interno: 'pcb_diox', activo: true },
            { id: 112, nombre: 'Sum PCBs marcad.', codigo: 's_pcb_m', codigo_interno: 's_pcb_m', activo: true },
            { id: 113, nombre: 'MoCB', codigo: 'mo_cb', codigo_interno: 'mo_cb', activo: true }
        ];
    }

    getCatalogoParametros(): Promise<Parametro[]> {
        return Promise.resolve(this._parametros);
    }

    private _parametroByCodigo(codigo: string): Parametro | undefined {
        return this._parametros.find(p => p.codigo === codigo || p.codigo_interno === codigo);
    }

    getAll(): Promise<Contrato[]> {
        return Promise.resolve(this._contratos);
    }

    getById(id: string): Promise<Contrato | undefined> {
        const found = this._contratos.find((c) => c.id === id);
        return Promise.resolve(found);
    }

    async create(contrato: Contrato): Promise<Contrato> {
        const nuevo: Contrato = { ...contrato };
        nuevo.id = nuevo.id || this._generateId();
        if (nuevo.activo === undefined) nuevo.activo = true;
        this._contratos = [...this._contratos, nuevo];
        return Promise.resolve(nuevo);
    }

    async update(id: string, contrato: Contrato): Promise<Contrato> {
        const idx = this._contratos.findIndex((c) => c.id === id);
        if (idx > -1) {
            const actualizado: Contrato = { ...this._contratos[idx], ...contrato, id };
            this._contratos[idx] = actualizado;
            return Promise.resolve(actualizado);
        }
        return Promise.reject(new Error('Contrato no encontrado'));
    }

    async delete(id: string): Promise<void> {
        this._contratos = this._contratos.filter((c) => c.id !== id);
        return Promise.resolve();
    }

    private _generateId(): string {
        let text = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 8; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return 'c-' + text;
    }
}
