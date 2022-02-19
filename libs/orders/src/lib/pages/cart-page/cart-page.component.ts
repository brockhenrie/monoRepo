import { CartItemsDetailed } from './../../models/cart.model';

import { CartService, OrdersService } from '@b-henrie-dev/orders';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartCount = 0;
    endSubs$ = new Subject<void>();

    cartItemsDetailed: CartItemsDetailed[] = [];
    constructor(
        private router: Router,
        private cs: CartService,
        private os: OrdersService
    ) {}
    ngOnDestroy(): void {
        this.endSubs$.next();
        this.endSubs$.complete();
    }

    ngOnInit(): void {
        this._getCartDetails();
    }

    backToShop() {
        this.router.navigate(['/products']);
    }
    removeItem(id: string) {
        this.cs.deleteCartItem(id);
    }

    private _getCartDetails() {
        this.cs.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
            this.cartItemsDetailed = [];
            this.cartCount = respCart?.items?.length ?? 0;
            respCart.items.forEach((cartItem) => {
                this.os
                    .getProduct(cartItem.productId)
                    .pipe(take(1))
                    .subscribe((responseProduct) => {
                        this.cartItemsDetailed.push({
                            product: responseProduct,
                            quantity: cartItem.quantity
                        });
                    });
            });
        });
    }
    updateCartItemQuantity(event:any, cartItem: CartItemsDetailed){
      const newQuantity = event.value;
      this.cs.setCartItem({
        productId: cartItem.product.id ,
        quantity: newQuantity}, true);

    }
}
