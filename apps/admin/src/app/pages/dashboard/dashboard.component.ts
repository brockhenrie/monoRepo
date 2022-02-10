import { Observable } from 'rxjs';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OrdersService } from '@b-henrie-dev/orders';
import { ProductsService } from '@b-henrie-dev/products';
import { UsersService } from '@b-henrie-dev/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  userCount$ = this.us.getTotalUsers();
  totalProducts$: Observable<unknown[]> = this.ps.getTotalProducts();
  totalSales$ = this.os.getTotalSales();
  orderCount$ = this.os.getOrderCount();

  constructor(
    private us: UsersService,
    private ps: ProductsService,
    private os:OrdersService
    ) { }

  ngOnInit(): void {
  }

  transformTotal(totalSales: any){
    let total = {...totalSales};
    return total[0].totalsales
  }
}
