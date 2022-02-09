/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private apiUrl = environment.productsApiUrl;

    constructor(private http: HttpClient, private router: Router) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl).pipe(
            catchError((err) => {
                console.log(JSON.stringify(err));
                return [];
            })
        );
    }
    getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(this.apiUrl + id).pipe(
            catchError((err) => {
                console.log(JSON.stringify(err));
                return [];
            }),
            shareReplay(1)
        );
    }
    createProduct(product: FormData) {
        console.log('Posting new Product...');
        return this.http
            .post(this.apiUrl, product)
            .pipe(catchError((err) => this.errorHandler(err)));
    }
    deleteProduct(id: string): Observable<Product> {
        return this.http.delete<Product>(`${this.apiUrl}${id}`);
    }

    updateProduct(product: FormData) {
        console.log('Updating Product...');
        return this.http
            .put<Product>(`${this.apiUrl}${product.get('id')}`, product)
            .pipe(catchError((err) => this.errorHandler(err)));
    }


    getTotalProducts():Observable<number>{
      return this.http.get<number>(this.apiUrl+'get/count');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private errorHandler(err: any) {
        const errorCategory: Product = {};
        console.log(err);

        return of(errorCategory);
    }
}
function tap(arg0: (res: any) => void): import("rxjs").OperatorFunction<number, number> {
  throw new Error('Function not implemented.');
}

