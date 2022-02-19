import { BehaviorSubject} from 'rxjs';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';

export const CART_KEY = 'cart';

@Injectable({
    providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

    constructor() {}

    setCartItem(cartItem: CartItem, updateCartItem?:boolean): Cart {
        const cart: Cart = this.getCart();
        const cartItemExists = cart.items.find(
            (item) => item.productId === cartItem.productId
        );
        if (cartItemExists) {
            cart.items.map((item) => {
                if (item.productId === cartItem.productId) {
                  if(updateCartItem){
                    item.quantity = cartItem.quantity;
                  }else{
                    item.quantity = item.quantity + cartItem.quantity;
                  }
                }
                return item;
            });
        } else {
            cart.items.push(cartItem);
        }
        this.storeCart(cart);
        this.cart$.next(cart);
        return cart;
    }

    getCart(): Cart {
        const cartJson: string = localStorage.getItem(CART_KEY) as string;
        const cart = JSON.parse(cartJson);
        return cart;
    }

    storeCart(cart: Cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    initCartLocalStorage() {
      const cart: Cart = this.getCart();
      if(!cart){
        const initialCart = {
          items: []
      };
      const initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY, initialCartJson);
      }
    }

    deleteCartItem(productId: string){
      const cart = this.getCart();
      const newCart = cart.items.filter(item => item.productId !== productId)
      cart.items = newCart;
      this.storeCart(cart);
      this.cart$.next(cart);
    }
}
