import { MessageService } from 'primeng/api';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Order, ORDER_STATUS } from '@b-henrie-dev/orders';
import { OrdersService } from 'libs/orders/src/lib/services/orders.service';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit {

  orders$: Observable<Order[]>;

    selectedOrder!: Order;
    orderStatus = ORDER_STATUS;

    constructor(
        private os: OrdersService,
        private router: Router,
        private ms: MessageService
    ) {}

    ngOnInit(): void {
        this._getOrders();
    }

    display: boolean = false;
    toggleDialog(order?: Order) {
        this.selectedOrder = order;
        this.display = !this.display;
    }

    onDeleteOrder(id: string) {
        this.os.deleteOrder(id).subscribe(
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
        this.orders$ = this.os.getOrders() as Observable<Order[]>;
    }
}
