import { MessageService } from 'primeng/api';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { Order, OrderStatus, ORDER_STATUS } from '@b-henrie-dev/orders';
import { OrdersService } from 'libs/orders/src/lib/services/orders.service';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit, OnDestroy {
    orders$!: Observable<Order[]>;
    private endSubs$ = new Subject<void>();

    selectedOrder!: Order;
    orderStatus= ORDER_STATUS as unknown as OrderStatus[];
    status = this.mapOrderStatus()
    constructor(
        private os: OrdersService,
        private router: Router,
        private ms: MessageService
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }

    ngOnDestroy(): void {
        this.endSubs();
    }

    display: boolean = false;
    toggleDialog(order?: Order) {
        this.selectedOrder = order as Order;
        this.display = !this.display;
    }

    onDeleteOrder(id?: string) {
      if(!id) return;
        this.os.deleteOrder(id).pipe(takeUntil(this.endSubs$)).subscribe(
            () => {
                this.ms.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User was deleted'
                });
            },
            (error) => {
                this.ms.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: "User wasn't deleted"
                });
            }
        );
        this._getOrders();
        this.toggleDialog();
    }

    onShowOrder(id: string) {
        this.router.navigateByUrl(`orders/details/${id}`);
    }

    private _getOrders() {
        this.orders$ = this.os.getOrders();
    }

    private endSubs() {
        this.endSubs$.next();
        // console.log('Orders list subs destroyed');
    }

    getOrderStatus(num: number){

      return this.status[num]
    }

    private mapOrderStatus() {
      return Object.keys(ORDER_STATUS).map(
        (value, index) => {
          const status = {
            value: index,
            label: this.orderStatus[index].label,
            color:  this.orderStatus[index].color
          };
          return status
        }
      ) as unknown as OrderStatus[];
  }
}
