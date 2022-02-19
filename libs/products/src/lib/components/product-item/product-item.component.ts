

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, Input } from '@angular/core';
import { CartItem, CartService } from '@b-henrie-dev/orders';
import { Product } from '../../models/product.model';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html'
})
export class ProductItemComponent implements OnInit {
    @Input() product!: Product;
    constructor(private cart:CartService) {}

    ngOnInit(): void {}

    addToCart(id?: string) {
        if (!id) {
            alert('invalid');
            return;
        }
       const newCartItem:CartItem = {
          productId: id,
          quantity: 1
        }
        this.cart.setCartItem(newCartItem);

    }
}
