import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule, ButtonModule],
    template: `
        <div class="flex flex-col gap-2">
            <div class="text-sm font-semibold">Notifications</div>
            <div class="max-h-96 overflow-y-auto pr-2">
     <span class="block text-muted-color font-medium mb-3 text-xs">TODAY</span>
        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
            <li class="flex items-center py-1.5 border-b border-surface">
                <div class="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-3 shrink-0">
                    <i class="pi pi-dollar text-lg text-blue-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal text-sm"
                    >Richard Jones
                    <span class="text-surface-700 dark:text-surface-100 text-xs">has purchased a blue t-shirt for <span class="text-primary font-bold">$79.00</span></span>
                </span>
            </li>
            <li class="flex items-center py-1.5">
                <div class="w-10 h-10 flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full mr-3 shrink-0">
                    <i class="pi pi-download text-lg text-orange-500"></i>
                </div>
                <span class="text-surface-700 dark:text-surface-100 leading-normal text-sm">Your request for withdrawal of <span class="text-primary font-bold">$2500.00</span> has been initiated.</span>
            </li>
        </ul>

        <span class="block text-muted-color font-medium mb-3 text-xs">YESTERDAY</span>
        <ul class="p-0 m-0 list-none mb-4">
            <li class="flex items-center py-1.5 border-b border-surface">
                <div class="w-10 h-10 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-3 shrink-0">
                    <i class="pi pi-dollar text-lg text-blue-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal text-sm"
                    >Keyser Wick
                    <span class="text-surface-700 dark:text-surface-100 text-xs">has purchased a black jacket for <span class="text-primary font-bold">$59.00</span></span>
                </span>
            </li>
            <li class="flex items-center py-1.5 border-b border-surface">
                <div class="w-10 h-10 flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-full mr-3 shrink-0">
                    <i class="pi pi-question text-lg text-pink-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal text-sm"
                    >Jane Davis
                    <span class="text-surface-700 dark:text-surface-100 text-xs">has posted a new questions about your product.</span>
                </span>
            </li>
        </ul>
        <span class="block text-muted-color font-medium mb-3 text-xs">LAST WEEK</span>
        <ul class="p-0 m-0 list-none">
            <li class="flex items-center py-1.5 border-b border-surface">
                <div class="w-10 h-10 flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full mr-3 shrink-0">
                    <i class="pi pi-arrow-up text-lg text-green-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal text-sm">Your revenue has increased by <span class="text-primary font-bold">%25</span>.</span>
            </li>
            <li class="flex items-center py-1.5 border-b border-surface">
                <div class="w-10 h-10 flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-full mr-3 shrink-0">
                    <i class="pi pi-heart text-lg text-purple-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal text-sm"><span class="text-primary font-bold">12</span> users have added your products to their wishlist.</span>
            </li>
        </ul>
            </div>

            <p-button label="Ver todas" severity="primary" class="mr-2" (onClick)="verTodas()" />
        </div>
    `,
    host: {
        class: 'hidden absolute top-13 right-0 w-96 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)]'
    }
})
export class AppNotifications {

    constructor(private router: Router, @Inject(DOCUMENT) private document: Document) { }

    verTodas() {
        this.cerrar();
        setTimeout(() => this.router.navigate(['/pages/notificaciones']), 150);
    }

    cerrar() {
        const evt = new MouseEvent('click', { bubbles: true, cancelable: true });
        (this.document.body || this.document).dispatchEvent(evt);
    }

}
