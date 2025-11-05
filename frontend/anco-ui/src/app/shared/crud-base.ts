import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { signal } from '@angular/core';
import { Router } from '@angular/router';

export interface GenericCrudService<T> {
    getAll(): Promise<T[]>;
    create?(item: T): Promise<T>;
    update?(id: string, item: T): Promise<T>;
    delete?(id: string): Promise<void>;
}

export interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

export interface ExportColumn {
    title: string;
    dataKey: string;
}

export abstract class CrudBase<T extends { id?: string;[key: string]: any }> {
    // diálogo para crear/editar
    dialogoEntidad: boolean = false;

    // lista de entidades (estado reactivo)
    entidades = signal<T[]>([]);

    // entidad actual
    entidad!: T;

    // selección múltiple
    entidadesSeleccionadas!: T[] | null;

    // flag de formulario enviado
    enviado: boolean = false;

    // estados / opciones (opcional)
    estados!: any[];

    // formatos de exportación (se pueden mapear con comandos en la base)
    formatos: any[] = [];

    filtros: { [key: string]: any } = {};

    actionsItems: any[] = [];

    // opcional: path base que usará el método 'ver' para navegar al detalle
    basePath?: string;

    // opcional: si el componente derivado asigna el router, el CRUD usará navegación en vez de dialog
    router?: Router;

    // La referencia `dt` debe ser implementada por el componente derivado con @ViewChild
    // Declaramos una propiedad abstracta para forzar al componente a proveerla.
    abstract dt: Table;

    // columnas y columnas para export
    columnas!: Column[];
    columnasExportacion!: ExportColumn[];

    protected constructor(
        protected servicio: GenericCrudService<T> | null,
        protected messageService: MessageService,
        protected confirmationService: ConfirmationService
    ) { }

    exportar(formato: string = 'CSV') {
        const f = (formato || 'CSV').toString().toUpperCase();
        switch (f) {
            case 'CSV':
                this.dt?.exportCSV();
                break;
            case 'PDF':
                // Implementación futura: el dt de prime no soporta exportPDF
                // this.dt?.exportPDF();
                break;
            case 'XLSX':
                // Implementación futura: el dt de prime no soporta exportXLSX
                // this.dt?.exportXLSX();
                break;
            default:
                this.dt?.exportCSV();
                break;
        }
    }

    async cargarDatos() {
        if (this.servicio && this.servicio.getAll) {
            const data = await this.servicio.getAll();
            this.entidades.set(data);
        }
    }

    buscar(tabla: Table, event: Event) {
        tabla.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    ver(item?: T) {
        const id = item?.id || (this.entidad as any)?.id;
        console.log('Navigating to view item with id:', id);

        if (this.router && this.basePath && id) {
            this.router.navigate([`/pages/${this.basePath}`, id]);
            return;
        }
    }

    crear() {
        this.entidad = {} as T;
        this.enviado = false;
        this.dialogoEntidad = true;
    }

    editar(item: T) {
        this.entidad = { ...(item as any) } as T;
        this.dialogoEntidad = true;
    }

    eliminarSeleccionadas() {
        this.confirmationService.confirm({
            message: '¿Está seguro que desea eliminar las entidades seleccionadas?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                if (this.servicio && this.servicio.delete) {
                    // eliminar en el servicio una por una
                    const ids = this.entidadesSeleccionadas?.map((s) => s.id).filter(Boolean) as string[] | undefined;
                    if (ids && ids.length) {
                        for (const id of ids) {
                            await this.servicio.delete!(id);
                        }
                    }
                }

                // actualizar estado local
                this.entidades.set(this.entidades().filter((val) => !this.entidadesSeleccionadas?.includes(val)));
                this.entidadesSeleccionadas = null;
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Entidades eliminadas', life: 3000 });
            }
        });
    }

    ocultarDialogo() {
        this.dialogoEntidad = false;
        this.enviado = false;
    }

    async eliminar(item: T) {
        const nombre = (item as any).name || (item as any).nombre || '';
        this.confirmationService.confirm({
            message: '¿Está seguro que desea eliminar ' + nombre + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                if (this.servicio && this.servicio.delete && item.id) {
                    await this.servicio.delete(item.id);
                }

                this.entidades.set(this.entidades().filter((val) => val.id !== item.id));
                this.entidad = {} as T;
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Entidad eliminada', life: 3000 });
            }
        });
    }

    encontrarIndicePorId(id: string): number {
        let index = -1;
        for (let i = 0; i < this.entidades().length; i++) {
            if (this.entidades()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    crearId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    // mapear severities opcional (puede ser override)
    obtenerSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    // Guarda la entidad usando el servicio si existe o localmente si no
    async modificar() {
        this.enviado = true;
        let _entidades = this.entidades();

        if (!(this.entidad as any).name?.trim()) return;

        if (this.entidad.id) {
            // update
            if (this.servicio && this.servicio.update) {
                await this.servicio.update(this.entidad.id, this.entidad);
            }
            _entidades[this.encontrarIndicePorId(this.entidad.id)] = this.entidad;
            this.entidades.set([..._entidades]);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Entidad actualizada', life: 3000 });
        } else {
            // create
            if (this.servicio && this.servicio.create) {
                const creado = await this.servicio.create(this.entidad);
                this.entidades.set([..._entidades, creado]);
            } else {
                this.entidad.id = this.crearId();
                (this.entidad as any).image = (this.entidad as any).image || 'product-placeholder.svg';
                this.entidades.set([..._entidades, this.entidad]);
            }

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Entidad creada', life: 3000 });
        }

        this.dialogoEntidad = false;
        this.entidad = {} as T;
    }
}
