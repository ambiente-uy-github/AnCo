import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="flex flex-col gap-2">
            <div class="text-sm font-semibold">Notifications</div>
            <div class="text-xs text-muted-color">(Vacío por ahora)</div>
        </div>
    `,
    host: {
        class: 'hidden absolute top-13 right-0 w-96 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]'
    }
})
export class AppNotifications { }
