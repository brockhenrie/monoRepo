import {
    BehaviorSubject,
    catchError,
    Observable,
    Subject,
    Subscription,
    takeUntil
} from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Order,
    ORDER_STATUS,
    OrdersService,
    OrderStatus
} from '@b-henrie-dev/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'orders-details',
    templateUrl: './orders-details.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class OrdersDetailsComponent implements OnInit {
    private endSubs$ = new Subject<void>();

    orderStatuses = ORDER_STATUS;
    selectedStatus!: number;
    activeOrder!: Order;
    statuses!:OrderStatus[];
    constructor(
        private os: OrdersService,
        private messageService: MessageService,
        private location: Location,
        private activeRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
       this.statuses = this.mapOrderStatus();
        this._populateOrder();
    }
    ngOnDestroy(): void {
        this.endSubs();
    }

    back() {
        this.location.back();
    }

    onStatusChange(event: any) {
        this.os
            .updateOrder({ status: event.value }, this.activeOrder.id as string)
            .pipe(takeUntil(this.endSubs$))
            .subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Status updated'
                    });
                },
                (err) => {
                    this.messageService.add({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'Status not updated'
                    });
                    console.log(err);
                }
            );
    }

    private _populateOrder() {
        this.activeRoute.params
            .pipe(takeUntil(this.endSubs$))
            .subscribe((params) => {
                if (params['id']) {
                    this.os
                        .getOrder(params['id'])
                        .pipe(takeUntil(this.endSubs$))
                        .subscribe((order) => {
                            this.activeOrder = order;
                            this.selectedStatus = order.status as number;
                        });

                    // console.log(this.activeOrder);
                }
            });
    }
    private mapOrderStatus() {
        return Object.keys(this.orderStatuses).map(
          (_value, index, orderStatuses) => {
            return {
              value: index,
              label: orderStatuses[index],
              color: orderStatuses[index]
            };
          }
        ) as unknown as OrderStatus[];
    }

    getTotal(num?: number, num2?:number) {
        if (num && num2) {
            return num * num2 as number;
        } else {
            return 0;
        }
    }

    private endSubs() {
        this.endSubs$.next();
        // console.log('Orders detail subs destroyed');
    }
}
