import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Contrato, ContratoService } from '../service/contratos.servicio';

@Component({
    selector: 'app-contrato-detalle',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
        <div class="p-4">
            <p-button label="Volver" icon="pi pi-arrow-left" class="mb-4" (onClick)="volver()"></p-button>

            <div *ngIf="loading">Cargando...</div>

            <div *ngIf="!loading && contrato">
                <h2 class="text-2xl font-bold">Contrato {{ contrato.id }}</h2>
                <p class="text-sm text-muted">ID Externo: {{ contrato.id_externo || '-' }}</p>

                <div class="mt-3">
                    <p><strong>Empresa:</strong> {{ contrato.empresa?.razon_social }}</p>
                    <p><strong>Planta:</strong> {{ contrato.planta?.nombre }}</p>
                    <p><strong>Emisor:</strong> {{ contrato.emisor?.nombre }} ({{ contrato.emisor?.tabla }})</p>
                    <p><strong>Fecha Desde:</strong> {{ contrato.fecha_desde | date:'short' }}</p>
                    <p><strong>Tipo Dato:</strong> {{ contrato.tipo_dato }}</p>
                    <p><strong>Frecuencia:</strong> {{ contrato.frecuencia_envio }}</p>
                    <p><strong>Tiempo Tolerancia (min):</strong> {{ contrato.tiempo_tolerancia }}</p>
                    <p><strong>Activo:</strong> {{ contrato.activo ? 'Sí' : 'No' }}</p>
                </div>

                <div class="mt-4">
                    <h4>Parámetros</h4>
                    <div *ngIf="contrato.parametros?.length; else sinParams">
                        <ul class="list-disc ml-6">
                            <li *ngFor="let p of contrato.parametros">{{ p.matriz }} - {{ p.parametro?.nombre }} ({{ p.unidad }}) [{{ p.limite_inferior }} - {{ p.limite_superior }}]</li>
                        </ul>
                    </div>
                    <ng-template #sinParams>Sin parámetros</ng-template>
                </div>
            </div>

            <div *ngIf="!loading && !contrato">Contrato no encontrado.</div>
        </div>
    `
})
export class ContratoDetalle implements OnInit {
    contrato: Contrato | null = null;
    loading = true;

    constructor(private route: ActivatedRoute, private svc: ContratoService) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.svc.getById(id).then((found) => {
                this.contrato = found || null;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
                this.contrato = null;
            });
        } else {
            this.loading = false;
        }
    }

    volver() {
        history.back();
    }
}
