import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { Product, ProductService } from '../service/product.service';
import { CrudBase } from 'src/app/shared/crud-base';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ESTADOS_CONTRATO, FORMATOS } from 'src/app/shared/constantes';
import { DrawerModule } from 'primeng/drawer';

@Component({
    selector: 'app-frecuencias',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        SplitButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        TooltipModule,
        DrawerModule,
        ButtonModule
    ],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="Nuevo" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="crearFrecuencia()" />
                <p-button severity="secondary" label="Eliminar" icon="pi pi-trash" outlined (onClick)="eliminarFrecuenciasSeleccionadas()" [disabled]="!entidadesSeleccionadas || !entidadesSeleccionadas.length" />
            </ng-template>

            <ng-template #end>
                <p-drawer [(visible)]="visibleRight" [style]="{ width: '25rem' }" header="Filtros" position="right">
                    <div class="p-4">
                        <div class="flex gap-2 mt-4">
                            <p-button label="Aplicar filtros" icon="pi pi-check" (onClick)="aplicarFiltrosFrecuencias()" />
                            <p-button label="Limpiar filtros" icon="pi pi-times" severity="secondary" (onClick)="limpiarFiltrosFrecuencias()" />
                        </div>
                    </div>
                </p-drawer>
                <p-button label="Filtrar" icon="pi pi-filter" (click)="visibleRight = true" class="mr-2" severity="secondary" />
                <p-splitbutton label="Exportar" (onClick)="exportarFrecuencias()" [model]="formatos"></p-splitbutton>
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="entidades()"
            [rows]="10"
            [columns]="columnas"
            [paginator]="true"
            [globalFilterFields]="camposDeBusqueda"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="entidadesSeleccionadas"
            [rowHover]="true"
            dataKey="id"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Frecuencias</h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="buscarFrecuencias(dt, $event)" placeholder="Buscar..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="width: 3rem">
                        <p-tableHeaderCheckbox />
                    </th>
                    <th *ngFor="let col of columnas" [style.min-width]="col.field === 'code' ? '16rem' : null">
                        <ng-container *ngIf="col.field !== 'image' && col.field !== 'actions'; else plainHeader">
                            <span [pSortableColumn]="col.field">
                                {{ col.header }}
                                <p-sortIcon [field]="col.field" />
                            </span>
                        </ng-container>
                        <ng-template #plainHeader>{{ col.header }}</ng-template>
                    </th>
                </tr>
            </ng-template>
            <ng-template #body let-entidad>
                <tr>
                    <td style="width: 3rem">
                        <p-tableCheckbox [value]="entidad" />
                    </td>
                    <td *ngFor="let col of columnas">
                        <ng-container [ngSwitch]="col.field">
                            <ng-container *ngSwitchCase="'image'">
                                <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + entidad.image" [alt]="entidad.name" style="width: 64px" class="rounded" *ngIf="entidad.image" />
                            </ng-container>

                            <ng-container *ngSwitchCase="'rating'">
                                <p-rating [(ngModel)]="entidad.rating" [readonly]="true" />
                            </ng-container>

                            <ng-container *ngSwitchCase="'inventoryStatus'">
                                <p-tag [value]="entidad.inventoryStatus" [severity]="obtenerSeverity(entidad.inventoryStatus)" />
                            </ng-container>

                            <ng-container *ngSwitchCase="'actions'">
                                <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true"  pTooltip="Editar" tooltipPosition="top" (click)="editarFrecuencia(entidad)" />
                                <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" pTooltip="Eliminar" tooltipPosition="top" (click)="eliminarFrecuencia(entidad)" />
                            </ng-container>

                            <ng-container *ngSwitchDefault>
                                {{ col.field === 'price' ? (entidad[col.field] | currency: 'USD') : entidad[col.field] }}
                            </ng-container>
                        </ng-container>
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="dialogoEntidad" [style]="{ width: '450px' }" header="Product Details" [modal]="true">
            <ng-template #content>
                <div class="flex flex-col gap-6">
                    <img [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + entidad.image" [alt]="entidad.image" class="block m-auto pb-4" *ngIf="entidad.image" />
                    <div>
                        <label for="name" class="block font-bold mb-3">Name</label>
                        <input type="text" pInputText id="name" [(ngModel)]="entidad.name" required autofocus fluid />
                        <small class="text-red-500" *ngIf="enviado && !entidad.name">Name is required.</small>
                    </div>
                    <div>
                        <label for="description" class="block font-bold mb-3">Description</label>
                        <textarea id="description" pTextarea [(ngModel)]="entidad.description" required rows="3" cols="20" fluid></textarea>
                    </div>

                    <div>
                        <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
                        <p-select [(ngModel)]="entidad.inventoryStatus" inputId="inventoryStatus" [options]="estados" optionLabel="label" optionValue="label" placeholder="Select a Status" fluid />
                    </div>

                    <div>
                        <span class="block font-bold mb-4">Category</span>
                        <div class="grid grid-cols-12 gap-4">
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category1" name="category" value="Accessories" [(ngModel)]="entidad.category" />
                                <label for="category1">Accessories</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category2" name="category" value="Clothing" [(ngModel)]="entidad.category" />
                                <label for="category2">Clothing</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category3" name="category" value="Electronics" [(ngModel)]="entidad.category" />
                                <label for="category3">Electronics</label>
                            </div>
                            <div class="flex items-center gap-2 col-span-6">
                                <p-radiobutton id="category4" name="category" value="Fitness" [(ngModel)]="entidad.category" />
                                <label for="category4">Fitness</label>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-6">
                            <label for="price" class="block font-bold mb-3">Price</label>
                            <p-inputnumber id="price" [(ngModel)]="entidad.price" mode="currency" currency="USD" locale="en-US" fluid />
                        </div>
                        <div class="col-span-6">
                            <label for="quantity" class="block font-bold mb-3">Quantity</label>
                            <p-inputnumber id="quantity" [(ngModel)]="entidad.quantity" fluid />
                        </div>
                    </div>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancel" icon="pi pi-times" text (click)="cerrarModalFrecuencia()" />
                <p-button label="Save" icon="pi pi-check" (click)="modificarFrecuencia()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    `,
    providers: [MessageService, ProductService, ConfirmationService]
})
export class Frecuencias extends CrudBase<Product> implements OnInit {
    camposDeBusqueda: string[] = [];
    visibleRight: boolean = false;
    filtrosDrawer: any = {};

    @ViewChild('dt')
    override dt!: Table;

    constructor(
        productService: ProductService,
        messageService: MessageService,
        confirmationService: ConfirmationService
    ) {
        super(productService as any, messageService, confirmationService);
    }

    ngOnInit() {
        this.cargarDatos();

        this.formatos = FORMATOS.map((f: any) => ({
            ...f,
            command: () => this.exportarFrecuencias((f.label || ''))
        }));
        this.estados = ESTADOS_CONTRATO;
        this.columnas = [
            { field: 'code', header: 'Código', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Nombre' },
            { field: 'image', header: 'Imagen' },
            { field: 'price', header: 'Precio' },
            { field: 'category', header: 'Categoría' },
            { field: 'rating', header: 'Reseñas' },
            { field: 'inventoryStatus', header: 'Estado' },
            { field: 'actions', header: 'Acciones' },
        ];

        this.columnasExportacion = this.columnas.map((col) => ({ title: col.header, dataKey: col.field }));

        this.camposDeBusqueda = this.columnas.map(c => c.field);
    }

    buscarFrecuencias(tabla: Table, event: Event) {
        super.buscar(tabla, event);
    }

    crearFrecuencia() {
        this.crear();
    }

    editarFrecuencia(item: Product) {
        this.editar(item);
    }

    eliminarFrecuenciasSeleccionadas() {
        this.eliminarSeleccionadas();
    }

    cerrarModalFrecuencia() {
        this.ocultarDialogo();
    }

    eliminarFrecuencia(item: Product) {
        this.eliminar(item);
    }

    modificarFrecuencia() {
        this.modificar();
    }

    exportarFrecuencias(formato: string = 'csv') {
        this.exportar(formato);
    }

    aplicarFiltrosFrecuencias() {
    }

    limpiarFiltrosFrecuencias() {
    }
}
