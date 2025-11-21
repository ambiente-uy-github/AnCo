import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EmisoresService } from '../service/emisores.servicio';
import { Columna, CrudBase, CrudBaseComponent } from '@/shared/crud-base.component';
import { FORMATOS } from '@/shared/constantes';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'app-emisores',
    standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        CheckboxModule,
        CrudBaseComponent,
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
export class Emisores implements OnInit {
    titulo = 'Emisores';
    columnas: Columna[] = [];
    crudConfig?: CrudBase;

    constructor(
        public emisoresService: EmisoresService,
    ) {
    }

    ngOnInit() {
        this.columnas = [
            { campo: 'id', encabezado: 'Identificador' },
            { campo: 'nombre', encabezado: 'Nombre' },
            { campo: 'planta.nombre', encabezado: 'Planta' },
            { campo: 'tabla', encabezado: 'Tabla' },
            { campo: 'activo', encabezado: 'Activo' },
            { campo: 'actions', encabezado: 'Acciones' },
        ];

        this.crudConfig = {
            servicio: this.emisoresService,
            titulo: this.titulo,
            columnas: this.columnas,
            formatos: FORMATOS.map((f: any) => ({ ...f })),
        };
    }
}
