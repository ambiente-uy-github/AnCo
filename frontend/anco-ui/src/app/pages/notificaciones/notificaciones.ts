import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Columna, CrudBase, CrudBaseComponent } from '@/shared/crud-base.component';
import { NotificacionesService } from '../service/notificaciones.servicio';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [CommonModule, CrudBaseComponent],
  template: `
            <app-crud-base [config]="crudConfig">
        </app-crud-base>
  `
})
export class Notificaciones {
  titulo = 'Notificaciones';
  columnas: Columna[] = [];
  crudConfig?: CrudBase;

  constructor(
    public notificacionesService: NotificacionesService,
  ) {
  }

  ngOnInit() {
    this.columnas = [
      { campo: 'id', encabezado: 'Identificador' },
      { campo: 'tipo', encabezado: 'Tipo' },
      { campo: 'mensaje', encabezado: 'Mensaje' },
      { campo: 'fecha', encabezado: 'Fecha' },
      { campo: 'leido', encabezado: 'Leído' },
      { campo: 'actions', encabezado: 'Acciones' },
    ];

    this.crudConfig = {
      servicio: this.notificacionesService,
      titulo: this.titulo,
      columnas: this.columnas,
      mostrarAccionesBase: false,
      // mostrarAccionesEncabezadoBase: false,
      accionesExtra: [{
        label: 'Marcar como leído', icon: 'pi pi-fw pi-check', outlined: true, command: (entidad: any) => {
          const id = entidad?.id;
          if (id) {
            this.notificacionesService.marcarComoLeido(id)
          }
        }
      },],
      accionesEncabezadoExtra: [{
        label: 'Marcar todas como leídas', icon: 'pi pi-fw pi-check-circle', command: () => {
          this.notificacionesService.marcarTodasComoLeidas();
        }
      },]
    };
  }
}