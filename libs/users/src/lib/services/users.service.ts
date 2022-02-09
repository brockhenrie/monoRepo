import { environment } from '@env/environment';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, shareReplay, tap } from 'rxjs';
import { User } from '../models/user.model';
@Injectable()
export class UsersService {
    private apiUrl = environment.usersApiUrl;

    constructor(private http: HttpClient, private router: Router) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl).pipe(
            catchError((err) => {
                console.log(JSON.stringify(err));
                return [];
            }),
            shareReplay(1)
        );
    }
    getUser(id: string): Observable<User> {
        return this.http.get<User>(this.apiUrl + id).pipe(
            catchError((err) => {
                console.log(JSON.stringify(err));
                return [];
            }),
            shareReplay(1)
        );
    }
    createUser(user:User) {
      console.log(user)
        return this.http
            .post<User>(this.apiUrl+'register', user)
            .pipe(catchError((err) => this.errorHandler(err)));
    }
    deleteUser(id: string): Observable<User> {
        return this.http
            .delete<User>(`${this.apiUrl}${id}`)
            .pipe(catchError((err) => this.errorHandler(err)));
    }

    updateUser(user: User) {
        return this.http
            .put<User>(`${this.apiUrl}${user.id}`, user)
            .pipe(catchError((err) => this.errorHandler(err)));
    }

    getTotalUsers():Observable<number>{
      return this.http.get<number>(this.apiUrl+'get/count').pipe(
        tap(res=>console.log(res))
      )
    }



    private errorHandler(err: any) {
        const errorUser: User = {};
        console.log(err);

        return of(errorUser);
    }
}
