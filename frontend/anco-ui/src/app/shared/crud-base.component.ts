import { Component, Input, OnInit, ViewChild, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, firstValueFrom } from 'rxjs';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';

export interface CrudBase {
    servicio: CrudBaseServicio<any> | null;
    titulo: string;
    columnas: Columna[];
    formatos?: any[];
    rutaBase?: string;
    seleccionMultiple?: boolean;
    accionesExtra?: any[];
    mostrarAccionesBase?: boolean;
    accionesEncabezadoExtra?: any[];
    mostrarAccionesEncabezadoBase?: boolean;
    validarEntidad?: (entidad: any) => boolean | string | Promise<boolean | string>;
}

export interface CrudBaseServicio<T> {
    obtener(): Promise<T[]> | Observable<T[]>;
    crear?(item: T): Promise<T> | Observable<T>;
    actualizar?(id: string, item: T): Promise<T> | Observable<T>;
    eliminar?(id: string): Promise<void> | Observable<void>;
}

export interface Columna {
    campo: string;
    encabezado: string;
    formatoFecha?: string;
    exportable?: boolean;
}

export const mensajes = {
    confirmaciones: {
        eliminar: { message: `¿Está seguro que desea eliminar la entidad?`, header: 'Confirmar', icon: 'pi pi-exclamation-triangle' },
        eliminarSeleccionadas: { message: '¿Está seguro que desea eliminar las entidades seleccionadas?', header: 'Confirmar', icon: 'pi pi-exclamation-triangle' }
    },

    notificaciones: {
        errorCarga: { severity: 'error', summary: 'Error', detail: 'No se pudieron cargar las entidades' },

        exitoCreacion: { severity: 'success', summary: 'Éxito', detail: 'Entidad creada', life: 3000 },
        errorCrear: { severity: 'error', summary: 'Error', detail: 'No se pudo crear la entidad' },

        exitoActualizacion: { severity: 'success', summary: 'Éxito', detail: 'Entidad actualizada', life: 3000 },
        errorActualizar: { severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la entidad' },

        errorFaltanDatos: { severity: 'error', summary: 'Error', detail: 'Faltan datos requeridos' },

        exitoEliminacion: { severity: 'success', summary: 'Éxito', detail: 'Entidad eliminada con éxito', life: 3000 },
        errorEliminar: { severity: 'error', summary: 'Error', detail: 'No se pudo eliminar la entidad' },
        entidadesEliminadas: { severity: 'success', summary: 'Éxito', detail: 'Entidades eliminadas', life: 3000 },
        errorEliminarUno: (id: any) => ({ severity: 'error', summary: 'Error', detail: `No se pudo eliminar entidad ${id}` })
    },
};

/**
 * Componente genérico CRUD.
 * Entradas:
 * crudConfig: configuración CRUD que incluye:
    servicio: CrudBaseServicio<any> | null;
    titulo: string;
    columnas: Columna[];
    formatos?: any[];
    rutaBase?: string;
    seleccionMultiple?: boolean;
    accionesExtra?: any[];
    mostrarAccionesBase?: boolean;
    accionesEncabezadoExtra?: any[];
    mostrarAccionesEncabezadoBase?: boolean;
    validarEntidad?: (entidad: any) => boolean | string | Promise<boolean | string>;
 */

@Component({
    selector: 'app-crud-base',
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
        DialogModule,
        InputTextModule,
        InputIconModule,
        TagModule,
        IconFieldModule,
        ConfirmDialogModule,
        TooltipModule,
        DrawerModule,
    ],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start *ngIf="mostrarAccionesEncabezadoBase">
                <p-button label="Nuevo" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="crear()" />
                <p-button *ngIf="seleccionMultiple" severity="secondary" label="Eliminar" icon="pi pi-trash" outlined (onClick)="eliminarSeleccionadas()" [disabled]="!entidadesSeleccionadas || !entidadesSeleccionadas.length" />
            </ng-template>

            <ng-template #end>
                <ng-container *ngIf="accionesEncabezado && accionesEncabezado.length">
                    <ng-container *ngFor="let acc of accionesEncabezado">
                        <p-button [label]="acc.label" [icon]="acc.icon" [severity]="acc.severity || 'secondary'" class="mr-2" (click)="acc.command ? acc.command() : null" [outlined]="acc.outlined"></p-button>
                    </ng-container>
                </ng-container>
                <ng-container *ngIf="mostrarAccionesEncabezadoBase">
                    <p-drawer [(visible)]="visibleRight" [style]="{ width: '25rem' }" header="Filtros" position="right">
                        <div class="p-4">
                            <div class="flex gap-2 mt-4">
                                <p-button label="Aplicar filtros" icon="pi pi-check" />
                                <p-button label="Limpiar filtros" icon="pi pi-times" severity="secondary" />
                            </div>
                        </div>
                    </p-drawer>
                    <p-button label="Filtrar" icon="pi pi-filter" (click)="visibleRight = true" class="mr-2" severity="secondary" />
                    <p-splitbutton label="Exportar" (onClick)="exportar()" [model]="formatos"></p-splitbutton>
                </ng-container>
            </ng-template>
        </p-toolbar>

    <p-table #dt [value]="entidades" [paginator]="true" [rows]="10" [globalFilterFields]="camposDeBusqueda" [selection]="seleccionMultiple ? entidadesSeleccionadas : null" (selectionChange)="seleccionarMultiple($event)" dataKey="id" [rowHover]="true">
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">{{ titulo || 'Entidades' }}</h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="buscar(dt, $event)" placeholder="Buscar..." />
                    </p-iconfield>
                </div>
            </ng-template>

            <ng-template #header>
                <tr>
                    <th *ngIf="seleccionMultiple" style="width: 3rem">
                        <p-tableHeaderCheckbox />
                    </th>
                    <th *ngFor="let col of columnas">
                        <ng-container *ngIf="col.campo !== 'actions'; else plainHeader">
                            <span>
                                {{ col.encabezado }}
                            </span>
                        </ng-container>
                        <ng-template #plainHeader>{{ col.encabezado }}</ng-template>
                    </th>
                </tr>
            </ng-template>

            <ng-template #body let-entidad>
                <tr>
                    <td *ngIf="seleccionMultiple" style="width: 3rem">
                        <p-tableCheckbox [value]="entidad" />
                    </td>
                    <td *ngFor="let col of columnas">
                        <ng-container [ngSwitch]="col.campo">
                            <ng-container *ngSwitchCase="'actions'">
                                <ng-container *ngIf="mostrarAccionesBase">
                                    <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true"  pTooltip="Editar" tooltipPosition="top" (click)="editar(entidad)" />
                                    <p-button icon="pi pi-trash" class="mr-2" severity="danger" [rounded]="true" [outlined]="true" pTooltip="Eliminar" tooltipPosition="top" (click)="eliminar(entidad)" />
                                </ng-container>
                                <ng-container *ngIf="acciones && acciones.length">
                                    <ng-container *ngFor="let accion of acciones">
                                        <p-button class="mr-2" [icon]="accion.icon" [severity]="accion.severity" [rounded]="true" [outlined]="accion.outlined" [pTooltip]="accion.label" tooltipPosition="top" (click)="accion.command(entidad)" />
                                    </ng-container>
                                </ng-container>
                            </ng-container>
                            <ng-container *ngSwitchDefault>
                                <!-- Render boolean fields as p-tag (Sí/No) with severity, otherwise show raw value -->
                                <ng-container *ngIf="obtenerValorAnidado(entidad, col.campo) === true || obtenerValorAnidado(entidad, col.campo) === false; else normalText">
                                    <p-tag [value]="obtenerValorAnidado(entidad, col.campo) ? 'SI' : 'NO'" [severity]="obtenerValorAnidado(entidad, col.campo) ? 'success' : 'danger'"></p-tag>
                                </ng-container>
                                <ng-template #normalText>
                                    <ng-container *ngIf="isDateValue(obtenerValorAnidado(entidad, col.campo)); else textOnly">
                                        {{ obtenerValorAnidado(entidad, col.campo) | date: (col.formatoFecha || 'short') }}
                                    </ng-container>
                                    <ng-template #textOnly>{{ obtenerValorAnidado(entidad, col.campo) }}</ng-template>
                                </ng-template>
                            </ng-container>
                        </ng-container>
                    </td>
                </tr>
            </ng-template>
        </p-table>

    <p-dialog [(visible)]="dialogoEntidad" [style]="{ width: '450px' }" [header]="dialogoTitulo + (esEdicion && entidad?.id ? ' - ' + entidad.id : '')" [modal]="true">
            <ng-template #content>
             <!-- Si el consumidor proporciona un template de formulario personalizado (template ref #crudForm), renderizarlo
                 con la 'entidad' en el contexto. De lo contrario, recurrir al formulario predeterminado generado automáticamente. -->
                <ng-container *ngIf="formTemplate;">
                    <!-- expose entidad plus some useful flags to the projected template -->
                    <ng-container *ngTemplateOutlet="formTemplate; context: { entidad: entidad, enviado: enviado, esEdicion: esEdicion }"></ng-container>
                </ng-container>
            </ng-template>

            <ng-template #footer>
                <p-button label="Cancelar" icon="pi pi-times" text (click)="cerrarDialogo()" />
                <p-button label="Guardar" icon="pi pi-check" (click)="guardar()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
    `,
    providers: [ConfirmationService]
})
export class CrudBaseComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() config?: CrudBase;

    @ViewChild('dt') dt!: Table;

    @ContentChild('crudForm', { read: TemplateRef }) formTemplate?: TemplateRef<any>;

    servicio: CrudBaseServicio<any> | null = null;
    columnas: Columna[] = [];
    formatos: any[] = [];
    titulo: string = '';
    rutaBase: string = '';
    seleccionMultiple: boolean = false;
    acciones: any[] = [];
    mostrarAccionesBase: boolean = true;
    accionesEncabezado: any[] = [];
    mostrarAccionesEncabezadoBase: boolean = true;
    validarEntidad?: (entidad: any) => boolean | string | Promise<boolean | string>;


    entidades: any[] = [];
    entidadesSeleccionadas: any[] | null = null;
    dialogoEntidad: boolean = false;
    entidad: any = {};
    esEdicion: boolean = false;
    enviado: boolean = false;
    camposDeBusqueda: string[] = [];
    dialogoTitulo: string = 'Entidad';
    router: Router;
    visibleRight: boolean = false;
    filtrosDrawer: any = {};
    mensajes = mensajes;
    columnasExportacion: Columna[] = [];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private cd: ChangeDetectorRef,
        router: Router
    ) {
        this.router = router;
    }

    ngOnInit(): void {
        this.applyConfig();

        this.cargarDatos();
        this.camposDeBusqueda = this.columnas.map((c: any) => c.campo);
        if (this.titulo) this.dialogoTitulo = this.titulo;
        this.formatos = (this.formatos || []).map((f: any) => ({ ...f, command: () => this.exportar(f.label || '') }));
    }

    ngAfterViewInit(): void {
        this.initDtColumns();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config']) {
            this.applyConfig();
        }

        if (changes['columnas']) {
            this.initDtColumns();
        }
    }

    crear() {
        this.entidad = {};
        this.enviado = false;
        this.esEdicion = false;
        this.mostrarDialogo();
    }

    editar(item: any) {
        this.entidad = { ...item };
        this.esEdicion = true;
        this.mostrarDialogo();
    }

    mostrarDialogo() {
        this.dialogoEntidad = true;
    }

    cerrarDialogo() {
        this.entidad = {};
        this.dialogoEntidad = false;
        this.enviado = false;
    }

    buscar(tabla: Table, event: Event) {
        tabla.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    seleccionarMultiple(event: any) {
        if (this.seleccionMultiple) {
            this.entidadesSeleccionadas = event;
        } else {
            this.entidadesSeleccionadas = null;
        }
    }

    ver(item?: any) {
        const id = item?.id || (this.entidad as any)?.id;

        if (this.router && this.rutaBase && id) {
            this.router.navigate([`/${this.rutaBase}`, id]);
            return;
        }
    }

    async cargarDatos() {
        if (this.servicio && this.servicio.obtener) {
            try {
                const data = await this.resolveResult<any[]>(this.servicio.obtener());
                this.entidades = data || [];
            } catch (err) {
                console.error('Error loading data', err);
                this.messageService.add(mensajes.notificaciones.errorCarga);
            }
        }
    }

    async guardar() {
        this.enviado = true;
        if (this.validarEntidad) {
            const validResult = await this.validarEntidad(this.entidad);
            if (validResult === false) {
                this.messageService.add(mensajes.notificaciones.errorFaltanDatos);
                return;
            }
        }

        if (!this.esEdicion) {
            if (this.servicio && this.servicio.crear) {
                try {
                    await this.resolveResult<any>(this.servicio.crear(this.entidad));
                    await this.cargarDatos();
                    this.messageService.add(mensajes.notificaciones.exitoCreacion);
                } catch (err) {
                    console.error('crear failed', err);
                    this.messageService.add(mensajes.notificaciones.errorCrear);
                }
            }
        } else {
            if (this.entidad.id && this.servicio && this.servicio.actualizar) {
                try {
                    await this.resolveResult<any>(this.servicio.actualizar(this.entidad.id, this.entidad));
                    await this.cargarDatos();
                    this.messageService.add(mensajes.notificaciones.exitoActualizacion);
                } catch (err) {
                    console.error('actualizar failed', err);
                    this.messageService.add(mensajes.notificaciones.errorActualizar);
                }
            }
        }

        this.cerrarDialogo();
    }

    async eliminar(item: any) {
        this.confirmationService.confirm({
            ...mensajes.confirmaciones.eliminar,
            accept: async () => {
                if (this.servicio && this.servicio.eliminar && item.id) {
                    try {
                        await this.resolveResult<void>(this.servicio.eliminar(item.id));
                        await this.cargarDatos();
                        this.messageService.add(mensajes.notificaciones.exitoEliminacion);
                    } catch (err) {
                        console.error('eliminar failed', err);
                        this.messageService.add(mensajes.notificaciones.errorEliminar);
                    }
                }
            }
        });
    }

    async eliminarSeleccionadas() {
        this.confirmationService.confirm({
            ...mensajes.confirmaciones.eliminarSeleccionadas,
            accept: async () => {
                if (this.servicio && this.servicio.eliminar && this.entidadesSeleccionadas?.length) {
                    const ids = this.entidadesSeleccionadas.map((s: any) => s.id).filter(Boolean) as string[];
                    for (const id of ids) {
                        try {
                            await this.resolveResult<void>(this.servicio.eliminar(id));
                        } catch (err) {
                            console.error('eliminar one failed', err);
                            this.messageService.add(mensajes.notificaciones.errorEliminarUno(id));
                        }
                    }
                    await this.cargarDatos();
                    this.messageService.add(mensajes.notificaciones.entidadesEliminadas);
                }
            }
        });
    }

    exportar(formato: string = 'CSV') {
        this.dt!.exportFilename = this.obtenerNombreArchivoExportacion();
        const f = (formato || 'CSV').toString().toUpperCase();
        switch (f) {
            case 'CSV':
                this.dt?.exportCSV();
                break;
            default:
                this.dt?.exportCSV();
                break;
        }
    }

    obtenerValorAnidado(obj: any, path: string): any {
        if (!obj || !path) return undefined;
        try {
            return path.split('.').reduce((acc: any, key: string) => (acc !== null && acc !== undefined ? acc[key] : undefined), obj);
        } catch (e) {
            return undefined;
        }
    }

    isDateValue(value: any): boolean {
        if (value instanceof Date) return true;
        return false;
    }

    private applyConfig(): void {
        if (!this.config) return;
        const c = this.config;
        if (c.servicio !== undefined) this.servicio = c.servicio || null;
        if (c.titulo !== undefined) this.titulo = c.titulo as string;
        if (c.columnas !== undefined) this.columnas = c.columnas as Columna[];
        if (c.formatos !== undefined) this.formatos = c.formatos as any[];
        if (c.rutaBase !== undefined) this.rutaBase = c.rutaBase as string;
        if (c.seleccionMultiple !== undefined) this.seleccionMultiple = !!c.seleccionMultiple;
        if (c.accionesExtra !== undefined) this.acciones = c.accionesExtra as any[];
        if (c.mostrarAccionesBase !== undefined) this.mostrarAccionesBase = !!c.mostrarAccionesBase;
        if (c.accionesEncabezadoExtra !== undefined) this.accionesEncabezado = c.accionesEncabezadoExtra as any[];
        if (c.mostrarAccionesEncabezadoBase !== undefined) this.mostrarAccionesEncabezadoBase = !!c.mostrarAccionesEncabezadoBase;
        if ((c as any).validarEntidad !== undefined) this.validarEntidad = (c as any).validarEntidad as any;
    }

    /**
        * @param result
        * @return Promise<T>
        *
        * Esta función resuelve un resultado que puede ser una Promesa, un Observable o un valor directo.
     */
    private resolveResult<T>(result: Promise<T> | Observable<T> | T): Promise<T> {
        if ((result as any)?.then && typeof (result as any).then === 'function') {
            return result as Promise<T>;
        }

        if ((result as any)?.subscribe && typeof (result as any).subscribe === 'function') {
            return firstValueFrom(result as Observable<T>);
        }

        return Promise.resolve(result as T);
    }

    private initDtColumns(): void {
        if (this.dt && (!this.dt.columns || !this.dt.columns.length)) {
            this.dt.columns = (this.columnas || []).map((c: any) => ({ field: c.campo, header: c.encabezado }));
            try {
                this.cd.detectChanges();
            } catch (e) {
            }
        }
    }

    private obtenerNombreArchivoExportacion(): string {
        const now = new Date();
        const pad = (n: number) => n.toString().padStart(2, '0');
        const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
        const baseName = this.titulo ?? 'descarga';
        return `${baseName}_${timestamp}`;
    }
}
