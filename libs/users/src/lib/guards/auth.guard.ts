/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private ls: LocalstorageService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.ls.getToken();
        if (token) {
          console.log('Token exists');
         //split token at '.' into array and get payload of token which contains isAdmin
         const tokenDecode = JSON.parse(atob(token.split('.')[1]));
         console.log(tokenDecode)
         if(tokenDecode.isAdmin === true && this._tokenExpired(tokenDecode.exp)){
          console.log('User is Admin');
          return true;
         }else{
           console.log('User is not admin')
         }

     }

        this.router.navigate(['login']);
        return false;
    }

    private _tokenExpired(expiration: number): boolean {
      const bool = Math.floor(new Date().getTime() / 1000) <= expiration;
      console.log(bool);
      return bool
  }
}
