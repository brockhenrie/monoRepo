import { environment } from '@env/environment';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from '@angular/router';
import { Category } from './../models/category.model';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    Observable,
    catchError,
    of,
    shareReplay,
} from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    private apiUrl = environment.categoriesApiUrl;

    constructor(private http: HttpClient, private router: Router) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl).pipe(

            catchError((err) => {
                console.log(JSON.stringify(err));
                return [];
            }),
            shareReplay(1)
        );
    }
    getCategory(id: string): Observable<Category> {
        return this.http.get<Category>(this.apiUrl + id).pipe(
            catchError((err) => {
                console.log(JSON.stringify(err));
                return [];
            }),
            shareReplay(1)
        );
    }
    createCategory(category: Category) {
        return this.http.post(this.apiUrl, category).pipe(
            catchError((err) => this.errorHandler(err))
        );
    }
    deleteCategory(id: string): Observable<Category> {
        return this.http.delete<Category>(`${this.apiUrl}${id}`).pipe(
            catchError((err) => this.errorHandler(err))
        );
    }

    updateCategory(category: Category) {
        return this.http
            .put<Category>(`${this.apiUrl}${category.id}`, category)
            .pipe(
                catchError((err) => this.errorHandler(err))
            );
    }

    private errorHandler(err: any) {
        const errorCategory: Category = {};
        console.log(err);

        return of(errorCategory);
    }


}
