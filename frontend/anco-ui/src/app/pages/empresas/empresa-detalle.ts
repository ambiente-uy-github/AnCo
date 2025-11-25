import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Empresa, EmpresasService } from '../service/empresas.servicio';
import { CopiarTexto } from '@/components/app.copiartexo';

@Component({
    selector: 'app-empresa-detalle',
    standalone: true,
    imports: [CommonModule, ButtonModule, CopiarTexto],
    template: `
        <div class="p-4">
            <div class="flex items-center justify-between mb-4">
                <p-button label="Volver" severity="secondary" icon="pi pi-arrow-left" class="p-button-text" (onClick)="volver()"></p-button>
            </div>

            <!-- Loading skeleton (tailwind-based) -->
            <div *ngIf="loading" class="space-y-3">
                <div class="h-10 w-3/5 bg-gray-200 rounded animate-pulse"></div>
                <div class="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                <div class="space-y-2">
                    <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            <div *ngIf="!loading && empresa" class="card">
                <div class="flex items-start justify-between">
                    <div>
                        <h2 class="text-2xl font-bold">{{ empresa?.razon_social }}</h2>
                    </div>
                </div>

                <div class="mt-3">
                    <p><strong>Id:</strong> {{ empresa?.id }}</p>
                    <p><strong>Usuario:</strong> {{ empresa?.usuario || '-' }}</p>
                    <p>
                        <strong>RUT: </strong>
                        <app-copiartexto [text]="empresa?.rut"></app-copiartexto>
                    </p>
                    <p><strong>Activa:</strong> {{ empresa?.activo ? 'Sí' : 'No' }}</p>
                    <p><strong>IP VPN:</strong> {{ empresa?.ip_vpn ?? '-' }}</p>
                    <p><strong>Fecha IP VPN:</strong> {{ empresa?.fecha_ip_vpn ?? '-' }}</p>
                </div>
            </div>

            <div *ngIf="!loading && !empresa" class="text-center text-gray-600 mt-6">
                <p class="font-medium">Empresa no encontrada.</p>
                <p class="text-sm">Verifica el listado de empresas o intenta nuevamente.</p>
            </div>
        </div>
    `
})
export class EmpresaDetalle implements OnInit {
    empresa: Empresa | null = null;
    loading = true;
    constructor(private route: ActivatedRoute, private router: Router, private svc: EmpresasService) { }

    /**
     * Actualmente se obtiene la empresa por ID de los datos cacheados en el servicio.
     * En el futuro, se podría mejorar para pegarle a la API directamente.
     */
    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.svc.obtenerPorId(id).then((found) => {
                this.empresa = found || null;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
                this.empresa = null;
            });
        } else {
            this.loading = false;
        }
    }

    volver() {
        history.back();
    }
}
