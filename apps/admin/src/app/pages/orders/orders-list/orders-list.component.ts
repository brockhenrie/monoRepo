import { MessageService } from 'primeng/api';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Order, OrdersService, OrderStatus, ORDER_STATUS } from '@b-henrie-dev/orders';

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
    display = false;

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
                    detail: `${JSON.stringify(error)}`
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

      return this.orderStatus[num]
    }


}
