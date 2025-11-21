import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export interface Notificaciones {
    id: string;
    tipo: string;
    mensaje: string;
    fecha: Date;
    leido: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificacionesService {
    private _notificaciones: Notificaciones[];

    constructor(private http: HttpClient, private messageService: MessageService) {
        this._notificaciones = this.getNotificacionesData();
    }

    getNotificacionesData() {
        return [
            {
                id: '1000',
                tipo: 'Info',
                mensaje: 'Notificación 1',
                fecha: new Date(),
                leido: false
            },
            {
                id: '1001',
                tipo: 'Alerta',
                mensaje: 'Notificación 2',
                fecha: new Date(),
                leido: true
            }
        ];
    }

    marcarComoLeido(id: string) {
        const notificacion = this._notificaciones.find(n => n.id === id);
        if (notificacion) {
            notificacion.leido = true;
        }
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `La notificación ha sido marcada como leída.` });
    }

    marcarTodasComoLeidas() {
        this._notificaciones.forEach(notificacion => {
            notificacion.leido = true;
        });
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Todas las notificaciones han sido marcadas como leídas.` });
    }


    obtener() {
        return Promise.resolve(this._notificaciones);
    }

    // async crear(unidad: Planta): Promise<Planta> {

    // }

    // async actualizar(id: string, unidad: Planta): Promise<Planta> {

    // }

    // async eliminar(id: string): Promise<void> {

    // }

}
