import { Category } from './../models/category.model';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    Observable,
    catchError,
    of,
    shareReplay,
    BehaviorSubject,
    tap,
    take
} from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private apiUrl = 'http://localhost:3000/api/v1/categories/';

    private categories: Category[] = [];

    categories$ = this.getCategories();

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl).pipe(
            tap((categories) => {
              this.categories = categories;
            }),
            catchError((err) => {
                console.log(JSON.stringify(err));
                return [];
            }),
            shareReplay(1)
        );
    }
    createCategory(category: Category) {

        return this.http
            .post(this.apiUrl, category)
            .pipe(catchError((err) => this.errorHandler(err)));
    }
    deleteCategory(id: string): Observable<Category> {
        return this.http
            .delete(`${this.apiUrl}${id}`)
            .pipe(catchError((err) => this.errorHandler(err)));
    }

    updateCategory(id: string, category: Category) {
        return this.http
            .put(`${this.apiUrl}${id}`, category)
            .pipe(catchError((err) => this.errorHandler(err)));
    }

    private errorHandler(err: any) {
        const errorCategory: Category = {};
        console.log(err);

        return of(errorCategory);
    }

}
