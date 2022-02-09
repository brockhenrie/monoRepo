import { LocalstorageService } from './../services/localstorage.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class IsAdminGuard implements CanActivate {
    constructor(private ls: LocalstorageService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.ls.getToken();
        if (token) {
            //split token at '.' into array and get payload of token which contains isAdmin
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));
            if (tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp))
                console.log('User is Admin');
            return true;
        }

        console.log('User not Admin');
        this.router.navigate(['/']);
        return false;
    }

    private _tokenExpired(expiration: number): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}
