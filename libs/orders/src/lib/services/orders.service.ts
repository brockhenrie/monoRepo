/* eslint-disable @typescript-eslint/no-unused-vars */
import { StripeService } from 'ngx-stripe';
import { OrderItem } from './../models/orderItem.model';
import { environment } from '@env/environment';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from '@angular/router';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, shareReplay, switchMap } from 'rxjs';
import { Order } from '../models/order.model';
@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private apiUrl = environment.ordersApiUrl;
    private apiProductsUrl = environment.productsApiUrl;

    constructor(private http: HttpClient, private router: Router, private ss: StripeService) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.apiUrl).pipe(
            catchError((err) => {
                console.log(JSON.stringify(err));
                return [];
            }),
            shareReplay(1)
        );
    }
    getOrder(id: string): Observable<Order> {
        return this.http.get<Order>(this.apiUrl + id).pipe(
            catchError((err) => {
                console.log(JSON.stringify(err));
                return [];
            }),
            shareReplay(1)
        );
    }
    createOrder(Order: Order) {
        console.log(Order);
        return this.http
            .post<Order>(this.apiUrl, Order)
            .pipe(catchError((err) => this.errorHandler(err)));
    }
    deleteOrder(id: string): Observable<Order> {
        return this.http
            .delete<Order>(`${this.apiUrl}${id}`)
            .pipe(catchError((err) => this.errorHandler(err)));
    }

    updateOrder(
        orderStatus: { status: string },
        id: string
    ): Observable<Order> {
        return this.http
            .put<Order>(`${this.apiUrl}${id}`, orderStatus)
            .pipe(catchError((err) => this.errorHandler(err)));
    }

    getTotalSales() {
        return this.http.get<{totalsales:number}[]>(this.apiUrl + 'get/totalsales');
    }

    getOrderCount() {
        return this.http.get(this.apiUrl + 'get/count');
    }
    private errorHandler(err: any) {
        const errorOrder: Order = {};
        console.log(err);

        return of(errorOrder);
    }

    getProduct(id: string): Observable<any> {
        return this.http.get<any>(this.apiProductsUrl + id).pipe(
            catchError((err) => {
                console.log(JSON.stringify(err));
                return [];
            }),
            shareReplay(1)
        );
    }

    createCheckoutSession(orderItem: OrderItem[]){
      return this.http.post(`${this.apiUrl}create-checkout-session`, orderItem)
      .pipe(
        switchMap((session: any)=>{
            return this.ss.redirectToCheckout({
              sessionId: session.id
            })
        })
      );
    }

    cacheOrderData(order: Order){
      localStorage.setItem('orderData', JSON.stringify(order));
    }
    getCachedOrderData(): Order{
      return JSON.parse(localStorage.getItem('orderData')as string);
    }
    removeOrderData(){
      localStorage.removeItem('orderData');
    }
}
