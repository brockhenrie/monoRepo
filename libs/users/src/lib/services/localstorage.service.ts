/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {
    constructor() {}

    setToken(data: string) {
        localStorage.setItem(TOKEN, data);
    }
    getToken(): string {
        return localStorage.getItem(TOKEN) as string;
    }
    removeToken() {
        localStorage.removeItem(TOKEN);
    }
    isValidToken(): boolean {
        const token = this.getToken();
        if (token) {
            const tokenDecode = JSON.parse(atob(token.split('.')[1]));

            return !this._tokenExpired(tokenDecode.exp);
        } else {
            return false;
        }
    }
    getUserIdFromToken(){
      const token = this.getToken();
      if (token) {
          const tokenDecode = JSON.parse(atob(token.split('.')[1]));
          if(!tokenDecode) return null;
          return tokenDecode.userId;
      }else{
        return null;
      }

    }


    private _tokenExpired(expiration: number): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}

const TOKEN = 'jwtToken';
