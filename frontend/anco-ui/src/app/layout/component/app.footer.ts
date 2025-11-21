import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<footer class="layout-footer">
        <div>AnCo — Análisis de Contratos © {{ currentYear }}</div>
        <div>Desarrollado por <a href="#" rel="noopener noreferrer" class="text-primary font-bold" aria-label="División de Información Ambiental (DIA)">DIA (División de Información Ambiental)</a></div>
    </footer>`
})
export class AppFooter {
    currentYear: number = new Date().getFullYear();
}
