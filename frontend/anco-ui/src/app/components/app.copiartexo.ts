import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-copiartexto',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
        <span class="copy-container" [title]="text">
            <span class="copy-text">{{ text }}</span>
            <p-button *ngIf="text" icon="pi pi-copy" class="copy-btn" rounded outlined (onClick)="doCopy($event)"></p-button>
        </span>
    `,
    styles: [
        `
        :host { display: inline-block; }
        .copy-container { position: relative; display: inline-flex; align-items: center; gap: 0.5rem; }
        .copy-btn { opacity: 0; transform: translateY(0); transition: opacity 120ms ease-in-out; }
        .copy-container:hover .copy-btn { opacity: 1; }
        .copy-text { user-select: text; }
        `
    ],
})
export class CopiarTexto {
    @Input() text?: string | null;

    constructor(private messageService: MessageService) { }

    copiado = false;

    async doCopy(event?: Event) {
        event?.stopPropagation();
        if (!this.text) return;
        try {
            if (navigator && 'clipboard' in navigator) {
                await navigator.clipboard.writeText(this.text);
            }
            this.copiado = true;
            setTimeout(() => (this.copiado = false), 1500);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Texto copiado al portapapeles.' });
        } catch (err) {
            console.warn('Copy failed', err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo copiar el texto.' });
        }
    }
}
