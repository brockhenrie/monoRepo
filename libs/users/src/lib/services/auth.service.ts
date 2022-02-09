import { LocalstorageService } from './localstorage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
  private apiUrl = environment.usersApiUrl;

  constructor(private http: HttpClient, private router: Router, private ls:LocalstorageService) {}

  login(email:string, password:string):Observable<User>{
    return this.http.post<User>(this.apiUrl+'login', {email,password})
  }
  logout(){
    this.ls.removeToken();
    this.router.navigate(['/login']); 
  }
}
