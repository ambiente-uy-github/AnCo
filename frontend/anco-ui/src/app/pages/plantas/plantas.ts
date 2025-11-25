import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { FORMATOS } from 'src/app/shared/constantes';
import { PlantasService } from '../service/plantas.servicio';
import { Columna, CrudBase, CrudBaseComponent } from '@/shared/crud-base.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'app-plantas',
    standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        InputNumberModule,
        CrudBaseComponent,
        CheckboxModule,
    ],
    template: `
         <app-crud-base [config]="crudConfig">
            <ng-template #crudForm let-entidad="entidad" let-enviado="enviado">
                <div class="flex flex-col gap-6">
                       <div>
                        <label for="nombre" class="block font-bold mb-3">Nombre</label>
                        <input pInputText type="text" id="nombre" [(ngModel)]="entidad.nombre" placeholder="Nombre" autofocus
                            [class.ng-dirty]="enviado && !entidad.nombre" [class.ng-invalid]="enviado && !entidad.nombre" />
                    </div>
                    <div>
                        <label for="tabla" class="block font-bold mb-3">Tabla</label>
                        <input pInputText type="text" id="tabla" [(ngModel)]="entidad.tabla" placeholder="Tabla"
                            [class.ng-dirty]="enviado && !entidad.tabla" [class.ng-invalid]="enviado && !entidad.tabla" />
                    </div>
                      <div class="flex items-center gap-3">
                        <p-checkbox id="activo" binary="true" [(ngModel)]="entidad.activo"></p-checkbox>
                        <label for="activo" class="font-bold">Activo</label>
                    </div>
                </div>
            </ng-template>
        </app-crud-base>
    `,
    providers: [ConfirmationService]
})
export class Plantas implements OnInit {
    titulo = 'Plantas';
    columnas: Columna[] = [];
    crudConfig?: CrudBase;

    constructor(
        public plantasService: PlantasService,
    ) {
    }

    ngOnInit() {
        this.columnas = [
            { campo: 'id', encabezado: 'Identificador' },
            { campo: 'nombre', encabezado: 'Nombre' },
            { campo: 'tabla', encabezado: 'Tabla' },
            { campo: 'ubicacion.direccion', encabezado: 'Ubicación' },
            { campo: 'ubicacion.localidad.nombre', encabezado: 'Localidad' },
            { campo: 'empresa.razon_social', encabezado: 'Empresa' },
            { campo: 'activo', encabezado: 'Activo' },
            { campo: 'actions', encabezado: 'Acciones' },
        ];

        this.crudConfig = {
            servicio: this.plantasService,
            titulo: this.titulo,
            columnas: this.columnas,
            formatos: FORMATOS.map((f: any) => ({ ...f })),
        };
    }
}