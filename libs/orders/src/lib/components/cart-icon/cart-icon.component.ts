import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
})
export class CartIconComponent implements OnInit, OnDestroy {
  cartCount = '0';
  unSub$ = new Subject<void>();
  constructor(private cs: CartService) { }

  ngOnDestroy(): void {
    this.unSub$.next();
  }

  ngOnInit(): void {
   this.cs.cart$.pipe(takeUntil(this.unSub$)).subscribe(cart=>{
      this.cartCount = cart.items.length.toLocaleString() ?? '0';
    });
  }

}
