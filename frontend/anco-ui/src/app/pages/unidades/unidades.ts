import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UnidadesService } from '../service/unidades.servicio';
import { Columna, CrudBaseComponent } from 'src/app/shared/crud-base.component';
import { CrudBase } from 'src/app/shared/crud-base.component';
import { FORMATOS } from 'src/app/shared/constantes';

@Component({
    selector: 'app-unidades',
    standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        CrudBaseComponent
    ],
    template: `
        <app-crud-base [config]="crudConfig">
            <ng-template #crudForm let-entidad="entidad" let-enviado="enviado">
                 <div class="flex flex-col gap-6">
                        <div>
                            <label for="nombre" class="block font-bold mb-3">Nombre</label>
                            <input pInputText type="text" id="nombre" [(ngModel)]="entidad.nombre" placeholder="Nombre"
                                [class.ng-dirty]="enviado && !entidad.nombre" [class.ng-invalid]="enviado && !entidad.nombre" />
                        </div>
                    </div>
            </ng-template>
        </app-crud-base>
    `,
    providers: [ConfirmationService]
})
export class Unidades implements OnInit {
    titulo = 'Unidades';
    columnas: Columna[] = [];
    crudConfig?: CrudBase;

    constructor(
        public unidadesService: UnidadesService,
    ) {
    }

    ngOnInit() {
        this.columnas = [
            { campo: 'id', encabezado: 'Identificador' },
            { campo: 'nombre', encabezado: 'Unidad' },
            { campo: 'actions', encabezado: 'Acciones' },
        ];

        this.crudConfig = {
            servicio: this.unidadesService,
            titulo: this.titulo,
            columnas: this.columnas,
            formatos: FORMATOS.map((f: any) => ({ ...f })),
        };
    }
}
