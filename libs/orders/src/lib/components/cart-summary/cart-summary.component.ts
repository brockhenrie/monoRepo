import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService, OrdersService } from '@b-henrie-dev/orders';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'orders-cart-summary',
    templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent implements OnInit, OnDestroy {
    totalPrice = 0;
    endSubs$ = new Subject<void>();
    constructor(private cs: CartService, private os: OrdersService, private router:Router) {}

    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    ngOnInit(): void {
      this._getCartSummary();
    }

    _getCartSummary() {
        this.cs.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
            this.totalPrice = 0;
            if (cart) {
                cart.items.map((item) => {
                    return this.os
                        .getProduct(item.productId)
                        .pipe(take(1))
                        .subscribe((product) => {
                            this.totalPrice += (product.price * item.quantity);
                        });
                });
            }
        });
    }

    navToCheckout(){
      this.router.navigate(['/checkout'])
    }
}
