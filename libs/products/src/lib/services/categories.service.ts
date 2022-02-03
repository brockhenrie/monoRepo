import { Router } from '@angular/router';
import { Category } from './../models/category.model';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, shareReplay } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private apiUrl = 'http://localhost:3000/api/v1/categories/';

    constructor(private http: HttpClient, private router: Router) {}

    getCategories(id?: string): Observable<Category[] | Category> {
        if (id) {
            return this.http.get<Category>(this.apiUrl + id).pipe(
                catchError((err) => {
                    console.log(JSON.stringify(err));
                    return [];
                }),
                shareReplay(1)
            );
        } else {
            return this.http.get<Category[]>(this.apiUrl).pipe(
                catchError((err) => {
                    console.log(JSON.stringify(err));
                    return [];
                }),
                shareReplay(1)
            );
        }
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

    updateCategory(id: string) {
        this.router.navigateByUrl(`categories/form/${id}`);
        // return this.http
        //     .put(`${this.apiUrl}${id}`, category)
        //     .pipe(catchError((err) => this.errorHandler(err)));
    }

    private errorHandler(err: any) {
        const errorCategory: Category = {};
        console.log(err);

        return of(errorCategory);
    }
}
