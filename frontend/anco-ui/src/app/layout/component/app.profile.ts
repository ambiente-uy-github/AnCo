import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, TieredMenuModule],
    template: `
          <p-tieredmenu [model]="tieredMenuItems"></p-tieredmenu>
    `,
    host: {
        class: 'hidden absolute top-13 right-0 w-64 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]'
    }
})
export class AppProfile {
    tieredMenuItems = [
        {
            label: 'Perfil',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Configuraciones',
                    icon: 'pi pi-fw pi-cog',
                    routerLink: ['/perfil/configuraciones']
                },
            ]
        },
        {
            separator: true
        },
        {
            label: 'Salir',
            icon: 'pi pi-fw pi-sign-out'
        }
    ];
}
