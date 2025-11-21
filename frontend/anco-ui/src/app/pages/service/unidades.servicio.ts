import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Unidad {
    id: string;
    nombre: string;
}

@Injectable({ providedIn: 'root' })
export class UnidadesService {
    private _unidades: Unidad[];

    constructor(private http: HttpClient) {
        this._unidades = this.getUnidadesData();
    }

    getUnidadesData(): Unidad[] {
        return [
            { id: '1000', nombre: 'Unidad 1' },
            { id: '1001', nombre: 'Unidad 2' },
            { id: '1002', nombre: 'Unidad 3' }
        ];
    }

    obtener() {
        return Promise.resolve(this._unidades);
    }

    // crear(unidad: Unidad): Observable<Unidad> {
    //     const url = `${this.apiConfig.baseUrl}/unidades`;
    //     return this.http.post<Unidad>(url, unidad).pipe(catchError(err => throwError(() => err)));
    // }

    // actualizar(id: string, unidad: Unidad): Observable<Unidad> {
    //     const url = `${this.apiConfig.baseUrl}/unidades/${id}`;
    //     return this.http.put<Unidad>(url, unidad).pipe(catchError(err => throwError(() => err)));
    // }

    // eliminar(id: string): Observable<void> {
    //     const url = `${this.apiConfig.baseUrl}/unidades/${id}`;
    //     return this.http.eliminar<void>(url).pipe(catchError(err => throwError(() => err)));
    // }
}
