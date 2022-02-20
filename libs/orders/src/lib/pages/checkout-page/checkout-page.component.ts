import { CartService, OrdersService, ORDER_STATUS } from '@b-henrie-dev/orders';
import { OrderItem } from './../../models/orderItem.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method*/
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { countries, states } from '@b-henrie-dev/users';
import { Order } from '../../models/order.model';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent implements OnInit {
  states = states;
  countries = countries;
  orderItems!:OrderItem[];
  userId = '62035a09ff256b4c48860445';
  cart$ = this.cs.cart$

  checkoutFormGroup!: FormGroup;
  isSubmitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cs: CartService,
    private os: OrdersService
  ) { }

  ngOnInit(): void {
    this._getCartItems();
    this._initForm();


  }

  backToCheckout(){
    this.router.navigate(['/cart'])
  }

  placeOrder(){
    this.isSubmitted = true;
    console.log('order started')

    if(this.checkoutFormGroup.invalid) return;

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['shippingAddress1'].value,
      shippingAddress2:this.checkoutForm['shippingAddress2'].value,
      city:this.checkoutForm['city'].value,
      state:this.checkoutForm['state'].value,
      zip:this.checkoutForm['zip'].value,
      country:this.checkoutForm['country'].value,
      phone:this.checkoutForm['phone'].value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    }

    this.os.createOrder(order).subscribe(order=>{
      //redirect to payment page


    })

  }

  private _getCartItems(){
    const cart: Cart = this.cs.getCart();
    this.orderItems = cart.items.map(item=>{
      return {
        product: item.productId,
        quantity: item.quantity
      } as OrderItem
    });
  }

  private _initForm(){
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
      status: [''],
      totalPrice: [''],
    })
  }


  get checkoutForm(){
    return this.checkoutFormGroup.controls
  }

}

