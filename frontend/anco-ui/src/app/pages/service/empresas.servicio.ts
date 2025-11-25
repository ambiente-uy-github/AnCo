import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

export interface Empresa {
    id: string;
    razon_social: string;
    rut: string;
    activo: boolean;
    usuario: string;
    pass?: string;
    ip_vpn?: string | null;
    fecha_ip_vpn?: string | null;
}

interface EmpresaRaw {
    id: string;
    razon_social: string;
    rut: string;
    activo: string | number | boolean;
    usuario: string;
    pass?: string;
    ip_vpn?: string | null;
    fecha_ip_vpn?: string | null;
}

interface ApiResponse<T = any> {
    ok?: boolean | number | string;
    description?: string;
    data?: T;
}

@Injectable({ providedIn: 'root' })
export class EmpresasService {
    private _empresas: Empresa[] = [];

    private apiUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
        this.loadPromise = this.loadEmpresas();
    }

    private loadPromise: Promise<void> = Promise.resolve();

    private async loadEmpresas(): Promise<void> {
        try {
            const res = await firstValueFrom(this.http.get<ApiResponse<EmpresaRaw[]>>(`${this.apiUrl}/empresa`));
            const raw = res?.data ?? [];
            this._empresas = raw.map((r) => this.mapEmpresa(r));
        } catch (err) {
            console.error('Error cargando empresas', err);
            this._empresas = [];
        }
    }

    private mapEmpresa(r: EmpresaRaw): Empresa {
        return {
            id: r.id,
            razon_social: r.razon_social,
            rut: r.rut,
            activo: r.activo === '1',
            usuario: r.usuario,
            pass: r.pass,
            ip_vpn: r.ip_vpn ?? null,
            fecha_ip_vpn: r.fecha_ip_vpn ?? null,
        };
    }

    async obtener(): Promise<Empresa[]> {
        await this.loadPromise;
        return this._empresas;
    }

    async obtenerPorId(id: string): Promise<Empresa | undefined> {
        await this.loadPromise;
        return this._empresas.find((c) => c.id === id);
    }

    async crear(empresa: Empresa): Promise<Empresa> {
        const payload: any = {
            razon_social: empresa.razon_social,
            rut: empresa.rut,
            usuario: empresa.usuario,
            pass: empresa.pass,
            activo: empresa.activo,
        };

        const res = await firstValueFrom(this.http.post<ApiResponse<EmpresaRaw | EmpresaRaw[]>>(`${this.apiUrl}/empresa`, payload));
        const raw = res?.data ?? null;
        const firstRaw = Array.isArray(raw) ? raw[0] : raw;
        const created = firstRaw ? this.mapEmpresa(firstRaw as EmpresaRaw) : (empresa as Empresa);
        await this.loadEmpresas();
        return created;
    }

    async actualizar(id: string, empresa: Empresa): Promise<Empresa> {
        const payload: any = {
            razon_social: empresa.razon_social,
        };

        const res = await firstValueFrom(this.http.put<ApiResponse<EmpresaRaw | EmpresaRaw[]>>(`${this.apiUrl}/empresa/${id}`, payload));
        const raw = res?.data ?? null;
        const firstRaw = Array.isArray(raw) ? raw[0] : raw;
        const updated = firstRaw ? this.mapEmpresa(firstRaw as EmpresaRaw) : empresa;
        await this.loadEmpresas();
        return updated;
    }

    async eliminar(id: string): Promise<void> {
        await firstValueFrom(this.http.delete<ApiResponse>(`${this.apiUrl}/empresa/${id}`));
        await this.loadEmpresas();
    }

}
