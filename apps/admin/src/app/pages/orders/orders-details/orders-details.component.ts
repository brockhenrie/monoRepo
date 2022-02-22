import {
    Subject,
    takeUntil
} from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    Order,
    ORDER_STATUS,
    OrdersService,
    OrderStatus
} from '@b-henrie-dev/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-orders-details',
    templateUrl: './orders-details.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class OrdersDetailsComponent implements OnInit, OnDestroy {
    private endSubs$ = new Subject<void>();

    orderStatuses = ORDER_STATUS as unknown as OrderStatus[];
    selectedStatus!: number;
    activeOrder!: Order;
    statuses = this.mapOrderStatus();
    constructor(
        private os: OrdersService,
        private messageService: MessageService,
        private location: Location,
        private activeRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._populateOrder();
    }
    ngOnDestroy(): void {
        this.endSubs();
    }

    back() {
        this.location.back();
    }

    onStatusChange(event:{value:string}) {
        this.os
            .updateOrder({ status: event.value }, this.activeOrder?.id as string)
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
    getOrderStatus(num: number){

      return this.orderStatuses[num]
    }

    private mapOrderStatus() {
      return Object.keys(ORDER_STATUS).map(
        (value, index) => {
          const status = {
            value: index,
            label: this.orderStatuses[index].label,
            color:  this.orderStatuses[index].color
          };
          return status
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
