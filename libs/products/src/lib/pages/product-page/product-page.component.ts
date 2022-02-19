import { MessageService } from 'primeng/api';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { OnDestroy } from '@angular/core';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CartItem, CartService } from '@b-henrie-dev/orders';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-product-page',
    templateUrl: './product-page.component.html'
})
export class ProductPageComponent implements OnInit, OnDestroy {
    isLoading = true;
    product$!: Observable<Product>;
    endSub$: Subject<void> = new Subject();
    quantity = 1;
    constructor(
        private ps: ProductsService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private cart: CartService,
    ) {}

    ngOnInit(): void {
        this.getProduct();
    }
    ngOnDestroy() {
        this.endSub$.next();
        this.endSub$.complete();
    }

    addProductToCart(id: string) {
        const newCartItem: CartItem = {
            productId: id,
            quantity: this.quantity
        };
        this.cart.setCartItem(newCartItem);

    }

    private getProduct() {
        this.activeRoute.params
            .pipe(takeUntil(this.endSub$))
            .subscribe((params: Params) => {
                if (params['id']) {
                    this.product$ = this.ps.getProduct(params['id']);
                    this.isLoading = false;
                } else {
                    this.router.navigateByUrl('/');
                }
            });
    }
}
