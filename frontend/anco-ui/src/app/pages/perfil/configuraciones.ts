import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-configuraciones',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  template: `
    <div class="p-4 inline-block">
      <h3 class="mb-2 text-lg font-semibold">Configuraciones</h3>
      <p class="text-gray-600 mb-4">Información de la cuenta</p>

      <div class="card p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex items-center">
            <label class="w-36 font-medium text-gray-700">Usuario</label>
            <input pInputText disabled type="text" class="flex-1 ml-4" [(ngModel)]="usuario.usuario" placeholder="Usuario" />
          </div>

          <div class="flex items-center">
            <label class="w-36 font-medium text-gray-700">Nombre</label>
            <input pInputText disabled type="text" class="flex-1 ml-4" [(ngModel)]="nombreCompleto" placeholder="Nombres" />
          </div>

          <div class="flex items-center">
            <label class="w-36 font-medium text-gray-700">Email</label>
            <input pInputText disabled type="text" class="flex-1 ml-4" [(ngModel)]="usuario.email" placeholder="Email" />
          </div>

          <div class="flex items-center">
            <label class="w-36 font-medium text-gray-700">Cédula</label>
            <input pInputText disabled type="text" class="flex-1 ml-4" [(ngModel)]="usuario.ci" placeholder="Cédula" />
          </div>

          <div class="flex items-center">
            <label class="w-36 font-medium text-gray-700">Rol</label>
            <input pInputText disabled type="text" class="flex-1 ml-4" [(ngModel)]="usuario.rol" placeholder="Rol" />
          </div>
          
        </div>
      </div>
    </div>
  `
})
export class Configuraciones {
  usuario: any = {
    usuario: 'jperez',
    email: 'juan.perez@example.com',
    nombres: 'Juan Pérez',
    apellidos: 'Pérez Gómez',
    ci: '55319226',
    rol: 'TIA'
  };

  get nombreCompleto(): string {
    const n = this.usuario?.nombres;
    const a = this.usuario?.apellidos;
    if (!n && !a) return '';
    return `${String(n).trim().split(/\s+/).join(' ')} ${String(a).trim().split(/\s+/).join(' ')}`;
  }
}