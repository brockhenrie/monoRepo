import { Component, OnInit } from '@angular/core';
import { CartService } from '@b-henrie-dev/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ng-shop-messages',
  templateUrl: './messgaes.component.html',
})
export class MessgaesComponent implements OnInit {

  constructor(private cartService: CartService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cart Updated!',
        life: 1500
      });
    });
  }
}
