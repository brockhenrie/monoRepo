import { Order, OrdersService, CartService } from '@b-henrie-dev/orders';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'orders-thankyou-page',
  templateUrl: './thankyou.component.html',
})
export class ThankyouComponent implements OnInit {
  orderData!: Order;

  constructor(
    private os: OrdersService,
    private cs: CartService
  ) { }

  ngOnInit(): void {
    this.orderData = this.os.getCachedOrderData();
    this.os.createOrder(this.orderData).subscribe(()=>{
      this.cs.emptyCart();
      this.os.removeOrderData();
    })
  }

}
