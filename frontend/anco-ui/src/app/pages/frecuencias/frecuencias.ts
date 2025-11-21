import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Columna, CrudBase, CrudBaseComponent } from 'src/app/shared/crud-base.component';
import { FORMATOS } from 'src/app/shared/constantes';
import { FrecuenciasService } from '../service/frecuencias.servicio';
import { PlantasService } from '../service/plantas.servicio';

@Component({
    selector: 'app-frecuencias',
    standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        InputNumberModule,
        CrudBaseComponent
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
                        <label for="minutos" class="block font-bold mb-3">Minutos</label>
                        <input pInputText type="number" id="minutos" [(ngModel)]="entidad.minutos" placeholder="Minutos"
                            [class.ng-dirty]="enviado && !entidad.minutos" [class.ng-invalid]="enviado && !entidad.minutos" />
                        
                    </div>
                </div>
            </ng-template>
        </app-crud-base>
    `,
    providers: [ConfirmationService]
})
export class Frecuencias implements OnInit {
    titulo = 'Frecuencias';
    columnas: Columna[] = [];
    crudConfig?: CrudBase;

    constructor(
        public frecuenciasService: FrecuenciasService,
    ) {
    }

    ngOnInit() {
        this.columnas = [
            { campo: 'id', encabezado: 'Identificador' },
            { campo: 'nombre', encabezado: 'Nombre' },
            { campo: 'minutos', encabezado: 'Minutos' },
            { campo: 'actions', encabezado: 'Acciones' },
        ];

        this.crudConfig = {
            servicio: this.frecuenciasService,
            titulo: this.titulo,
            columnas: this.columnas,
            formatos: FORMATOS.map((f: any) => ({ ...f })),
        };
    }
}
