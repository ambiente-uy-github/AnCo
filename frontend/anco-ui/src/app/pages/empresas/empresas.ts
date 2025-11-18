import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FORMATOS } from 'src/app/shared/constantes';
import { EmpresasService } from '../service/empresas.servicio';
import { Router } from '@angular/router';
import { Columna, CrudBase, CrudBaseComponent } from '@/shared/crud-base.component';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
    selector: 'app-empresas',
    standalone: true,
    imports: [
        FormsModule,
        InputTextModule,
        InputNumberModule,
        CheckboxModule,
        CrudBaseComponent,
    ],
    template: `
          <app-crud-base [config]="crudConfig">
            <ng-template #crudForm let-entidad="entidad" let-enviado="enviado">
                <div class="flex flex-col gap-6">
                    <div>
                        <label for="razon_social" class="block font-bold mb-3">Nombre</label>
                        <input pInputText type="text" id="razon_social" [(ngModel)]="entidad.razon_social" placeholder="Nombre" autofocus
                            [class.ng-dirty]="enviado && !entidad.razon_social" [class.ng-invalid]="enviado && !entidad.razon_social" />
                    </div>
                    <div>
                        <label for="rut" class="block font-bold mb-3">Rut</label>
                        <input pInputText type="number" id="rut" [(ngModel)]="entidad.rut" placeholder="Rut"
                            [class.ng-dirty]="enviado && !entidad.rut" [class.ng-invalid]="enviado && !entidad.rut" />
                    </div>
                    <div class="flex items-center gap-3">
                        <p-checkbox id="activa" binary="true" [(ngModel)]="entidad.activa"></p-checkbox>
                        <label for="activa" class="font-bold">Activa</label>
                    </div>
                </div>
            </ng-template>
        </app-crud-base>
    `,
    providers: [ConfirmationService]
})
export class Empresas implements OnInit {
    titulo = 'Empresas';
    columnas: Columna[] = [];
    crudConfig?: CrudBase;

    constructor(
        public empresasService: EmpresasService,
        public router: Router
    ) {
    }

    ngOnInit() {
        this.columnas = [
            { campo: 'rut', encabezado: 'Rut' },
            { campo: 'razon_social', encabezado: 'Razon social' },
            { campo: 'usuario', encabezado: 'Usuario' },
            { campo: 'activa', encabezado: 'Activa' },
            { campo: 'actions', encabezado: 'Acciones' },
        ];

        this.crudConfig = {
            servicio: this.empresasService,
            titulo: this.titulo,
            columnas: this.columnas,
            accionesExtra: [
                {
                    label: 'Ver detalle', icon: 'pi pi-fw pi-eye', outlined: true, command: (entidad: any) => {
                        const id = entidad?.id;
                        if (id) {
                            this.router.navigate(['/pages/empresas', id]);
                        }
                    }
                }
            ],
            formatos: FORMATOS.map((f: any) => ({ ...f })),
        };
    }
}
