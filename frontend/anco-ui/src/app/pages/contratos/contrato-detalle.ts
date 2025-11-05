import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Product, ProductService } from '../service/product.service';

@Component({
    selector: 'app-contrato-detalle',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
        <div class="p-4">
            <p-button label="Volver" icon="pi pi-arrow-left" class="mb-4" (onClick)="volver()"></p-button>

            <div *ngIf="loading">Cargando...</div>

            <div *ngIf="!loading && producto">
                <h2 class="text-2xl font-bold">{{ producto.name }}</h2>
                <p class="text-sm text-muted">Código: {{ producto.code }}</p>
                <p class="mt-3">{{ producto.description }}</p>

                <div class="mt-4">
                    <p><strong>Precio:</strong> {{ producto.price | currency:'USD' }}</p>
                    <p><strong>Categoría:</strong> {{ producto.category }}</p>
                    <p><strong>Cantidad:</strong> {{ producto.quantity }}</p>
                    <p><strong>Estado:</strong> {{ producto.inventoryStatus }}</p>
                </div>
            </div>

            <div *ngIf="!loading && !producto">Contrato no encontrado.</div>
        </div>
    `
})
export class ContratoDetalle implements OnInit {
    producto: Product | null = null;
    loading = true;

    constructor(private route: ActivatedRoute, private svc: ProductService) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.svc.getAll().then((all) => {
                const found = all.find((p) => p.id === id);
                this.producto = found || null;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
                this.producto = null;
            });
        } else {
            this.loading = false;
        }
    }

    volver() {
        history.back();
    }
}
