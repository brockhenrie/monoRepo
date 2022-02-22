import { UsersService } from '@b-henrie-dev/users';
import { CartService, OrdersService } from '@b-henrie-dev/orders';
import { OrderItem } from './../../models/orderItem.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method*/
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { countries, states } from '@b-henrie-dev/users';
import { Order } from '../../models/order.model';
import { Cart } from '../../models/cart.model';
import {  takeUntil, Subject } from 'rxjs';


@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
    states = states;
    countries = countries;
    orderItems!: OrderItem[];
    userId!:string;
    cart$ = this.cs.cart$;

    checkoutFormGroup!: FormGroup;
    isSubmitted = false;

    endSubs$ = new Subject<void>();

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private cs: CartService,
        private os: OrdersService,
        private us: UsersService,

    ) {}

    ngOnInit(): void {
        this._initForm();
        this._getCartItems();
        this._autoFillUserData();
    }

    ngOnDestroy(){
      this.endSubs$.next();
      this.endSubs$.complete();

    }

    backToCheckout() {
        this.router.navigate(['/cart']);
    }

    placeOrder() {
        this.isSubmitted = true;
        console.log('order started');

        if (this.checkoutFormGroup.invalid) return;

        const order: Order = {
            orderItems: this.orderItems,
            shippingAddress1: this.checkoutForm['shippingAddress1'].value,
            shippingAddress2: this.checkoutForm['shippingAddress2'].value,
            city: this.checkoutForm['city'].value,
            state: this.checkoutForm['state'].value,
            zip: this.checkoutForm['zip'].value,
            country: this.checkoutForm['country'].value,
            phone: this.checkoutForm['phone'].value,
            status: 0,
            user: this.userId,
            dateOrdered: `${Date.now()}`
        };
        this.os.cacheOrderData(order);

        this.os.createCheckoutSession(order.orderItems as OrderItem[]).subscribe((error)=>{
          if(error){
            console.log(error, 'Error in redirect to payment')
          }
        })


        // this.os.createOrder(order).subscribe((order) => {
        //     //redirect to payment page
        // });
    }

    private _getCartItems() {
        const cart: Cart = this.cs.getCart();
        this.orderItems = cart.items.map((item) => {
            return {
                product: item.productId,
                quantity: item.quantity
            } as OrderItem;
        });
    }

    private _initForm() {
        this.checkoutFormGroup = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            shippingAddress1: ['', Validators.required],
            shippingAddress2: ['', Validators.required],
            city: ['', Validators.required],
            state: ['Arizona', Validators.required],
            zip: ['', Validators.required],
            country: ['United States', Validators.required],
        });
    }

    private _autoFillUserData() {
        this.us
            .observeCurrentUser()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((user) => {
              if(user){
                this.checkoutForm['name'].setValue(user.name);
                this.checkoutForm['email'].setValue(user.email);
                this.checkoutForm['phone'].setValue(user.phone);
                this.checkoutForm['shippingAddress1'].setValue(user.shippingAddress1);
                this.checkoutForm['shippingAddress2'].setValue(user.shippingAddress2);
                this.checkoutForm['city'].setValue(user.city);
                this.checkoutForm['state'].setValue(user.state);
                this.checkoutForm['zip'].setValue(user.zip);
                this.checkoutForm['country'].setValue(user.country);
                if(user.id){
                  this.userId = user.id;
                }else{ return }
              }else{return};

            });
    }

    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
