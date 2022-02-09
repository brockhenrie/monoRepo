/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {

  constructor() { }

  setToken(data:string){
    localStorage.setItem(TOKEN, data)
  }
  getToken():string{
    return localStorage.getItem(TOKEN) as string
  }
  removeToken(){
    localStorage.removeItem(TOKEN);
  }
}

const TOKEN = 'jwtToken'
