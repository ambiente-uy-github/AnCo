import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Empresa, EmpresasService } from '../service/empresas.servicio';

@Component({
    selector: 'app-empresa-detalle',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
        <div class="p-4">
            <p-button label="Volver" icon="pi pi-arrow-left" class="mb-4" (onClick)="volver()"></p-button>

            <div *ngIf="loading">Cargando...</div>

            <div *ngIf="!loading && empresa">
                <h2 class="text-2xl font-bold">Empresa {{ empresa.id }}</h2>
                <div class="mt-3">
                    <p><strong>Empresa:</strong> {{ empresa?.razon_social }}</p>
                    <p><strong>RUT:</strong> {{ empresa?.rut }}</p>
                    <p><strong>Usuario:</strong> {{ empresa?.usuario }}</p>
                    <p><strong>Activa:</strong> {{ empresa?.activa ? 'Sí' : 'No' }}</p>
                </div>
            </div>

            <div *ngIf="!loading && !empresa">Empresa no encontrada.</div>
        </div>
    `
})
export class EmpresaDetalle implements OnInit {
    empresa: Empresa | null = null;
    loading = true;

    constructor(private route: ActivatedRoute, private svc: EmpresasService) { }

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
