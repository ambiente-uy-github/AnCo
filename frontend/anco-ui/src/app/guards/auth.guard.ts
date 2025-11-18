import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // Asumiendo que la aplicación almacena un token de autenticación o un objeto de usuario en localStorage.
        const token = localStorage.getItem('token') || localStorage.getItem('user') || true;

        if (token) {
            return true;
        }

        return this.router.parseUrl('/auth/login');
    }
}
