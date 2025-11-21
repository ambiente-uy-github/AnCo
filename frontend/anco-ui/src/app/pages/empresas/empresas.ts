import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        CommonModule,
        FormsModule,
        InputTextModule,
        InputNumberModule,
        CheckboxModule,
        CrudBaseComponent,
    ],
    template: `
          <app-crud-base [config]="crudConfig">
            <ng-template #crudForm let-entidad="entidad" let-enviado="enviado" let-esEdicion="esEdicion">
                <div class="flex flex-col gap-6">
                    <div>
                        <label for="razon_social" class="block font-bold mb-3">Razón Social</label>
                        <input pInputText type="text" id="razon_social" [(ngModel)]="entidad.razon_social" placeholder="Razón Social" autofocus
                            [class.ng-dirty]="enviado && !entidad.razon_social" [class.ng-invalid]="enviado && !entidad.razon_social" />
                    </div>

                    <!-- Al editar solo permitir actualizar la razón social. En creación mostrar los demás campos. -->
                    <ng-container *ngIf="!entidad?.id">
                        <div>
                            <label for="rut" class="block font-bold mb-3">RUT</label>
                            <input pInputText type="text" id="rut" [(ngModel)]="entidad.rut" placeholder="RUT"
                                [class.ng-dirty]="enviado && !entidad.rut" [class.ng-invalid]="enviado && !entidad.rut" />
                        </div>
                        <div>
                            <label for="usuario" class="block font-bold mb-3">Usuario</label>
                            <input pInputText type="text" id="usuario" [(ngModel)]="entidad.usuario" placeholder="Usuario"
                                [class.ng-dirty]="enviado && !entidad.usuario" [class.ng-invalid]="enviado && !entidad.usuario" />
                        </div>
                        <div>
                            <label for="pass" class="block font-bold mb-3">Contraseña</label>
                            <input pInputText type="password" id="pass" [(ngModel)]="entidad.pass" placeholder="Contraseña"
                                [class.ng-dirty]="enviado && !entidad.pass" [class.ng-invalid]="enviado && !entidad.pass" />
                        </div>
                        <div class="flex items-center gap-3">
                        <p-checkbox id="activo" binary="true" [(ngModel)]="entidad.activo"></p-checkbox>
                        <label for="activo" class="font-bold">Activa</label>
                    </div>
                    </ng-container>
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
            { campo: 'activo', encabezado: 'Activa' },
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
            validarEntidad: (entidad: any) => {
                if (!entidad || !entidad.razon_social) return false;
                if (!entidad?.id) {
                    if (!entidad?.rut || !entidad?.usuario || !entidad?.pass) return false;
                }
                return true;
            },
        };
    }
}
