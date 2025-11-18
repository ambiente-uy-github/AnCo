import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ContratoService } from '../service/contratos.servicio';
import { FORMATOS } from 'src/app/shared/constantes';
import { Columna, CrudBase, CrudBaseComponent } from '@/shared/crud-base.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contratos',
    standalone: true,
    imports: [
        CrudBaseComponent,
    ],
    template: `
     <app-crud-base [config]="crudConfig">
            <ng-template #crudForm let-entidad="entidad" let-enviado="enviado">
                <div class="flex flex-col gap-6">
                </div>
            </ng-template>
        </app-crud-base>
        `,
    providers: [ConfirmationService]
})
export class Contratos implements OnInit {
    titulo = 'Contratos';
    columnas: Columna[] = [];
    crudConfig?: CrudBase;

    constructor(
        public contratosServicio: ContratoService,
        public router: Router
    ) {
    }

    ngOnInit() {
        this.columnas = [
            { campo: 'id', encabezado: 'Identificador' },
            { campo: 'id_externo', encabezado: 'ID Externo' },
            { campo: 'empresa.razon_social', encabezado: 'Empresa' },
            { campo: 'planta.nombre', encabezado: 'Planta' },
            { campo: 'emisor.nombre', encabezado: 'Emisor' },
            { campo: 'fecha_desde', encabezado: 'Fecha desde' },
            { campo: 'frecuencia_envio', encabezado: 'Frecuencia' },
            { campo: 'tiempo_tolerancia', encabezado: 'Tiempo Tolerancia' },
            { campo: 'ambiente', encabezado: 'Ambiente' },
            { campo: 'activo', encabezado: 'Activo' },
            { campo: 'actions', encabezado: 'Acciones', exportable: false },
        ];

        this.crudConfig = {
            servicio: this.contratosServicio,
            titulo: this.titulo,
            columnas: this.columnas,
            accionesExtra: [{
                label: 'Ver detalle', icon: 'pi pi-fw pi-eye', outlined: true, command: (entidad: any) => {
                    const id = entidad?.id;
                    if (id) {
                        this.router.navigate(['/pages/contratos', id]);
                    }
                }
            },
            {
                label: 'Pasar a producción', icon: 'pi pi-fw pi-check', outlined: false, severity: 'success', command: (entidad: any) => {
                    const id = entidad?.id;
                    if (id) {
                        this.contratosServicio.pasarAProduccion(id)
                    }
                }
            },
            {
                label: 'Solicitar pasaje a producción', icon: 'pi pi-fw pi-send', outlined: false, command: (entidad: any) => {
                    const id = entidad?.id;
                    if (id) {
                        this.contratosServicio.solicitarPasajeAProduccion(id)
                    }
                }
            }
            ],
            formatos: FORMATOS.map((f: any) => ({ ...f })),
        };
    }
}
