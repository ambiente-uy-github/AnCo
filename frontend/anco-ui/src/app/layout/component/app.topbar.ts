import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { AppNotifications } from './app.notifications';
import { LayoutService } from '../service/layout.service';
import { AppProfile } from './app.profile';
import { OverlayBadge } from 'primeng/overlaybadge';
import { TagModule } from 'primeng/tag';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, AppNotifications, AppProfile, OverlayBadge, TagModule],
    template: ` 
        <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <span>AnCo <span class="text-base">Análisis de contratos</span></span>
            </a>
        </div>
        <div *ngIf="!production" class="layout-topbar-center">
            <p-tag icon="pi pi-exclamation-triangle" severity="warn" value="Ambiente de pruebas"></p-tag>
        </div>
        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass=".shared-config"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator class="shared-config" />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <div class="relative">
                        <ng-container *ngIf="showNotificationBadge; else noBadge">
                            <p-overlaybadge [value]="notificationCount">
                                <button type="button" class="layout-topbar-action" pStyleClass=".notif-popup" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                                    <i class="pi pi-bell"></i>
                                    <span>Notifications</span>
                                </button>
                            </p-overlaybadge>
                        </ng-container>
                        <ng-template #noBadge>
                            <button type="button" class="layout-topbar-action" pStyleClass=".notif-popup" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                                <i class="pi pi-bell"></i>
                                <span>Notifications</span>
                            </button>
                        </ng-template>
                        <app-notifications class="notif-popup" />
                    </div>
                    <div class="relative">
                        <button type="button" class="layout-topbar-action" pStyleClass=".profile-popup" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                            <i class="pi pi-user"></i>
                            <span>Profile</span>
                        </button>
                        <app-profile class="profile-popup" />
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];
    notifications: MenuItem[] = [];

    public production = environment.production;

    get notificationCount(): number {
        return this.notifications.length || 10;
    }

    get showNotificationBadge(): boolean {
        return this.notificationCount > 0;
    }

    constructor(public layoutService: LayoutService) { }

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}

