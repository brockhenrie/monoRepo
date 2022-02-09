import { BehaviorSubject, catchError, Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, ORDER_STATUS, OrdersService } from '@b-henrie-dev/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'orders-details',
    templateUrl: './orders-details.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class OrdersDetailsComponent implements OnInit {
    orderStatuses = [];
    selectedStatus:number;
    activeOrder!: Order;

    constructor(
        private os: OrdersService,
        private messageService: MessageService,
        private location: Location,
        private activeRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.mapOrderStatus();
        this._populateOrder();



    }

    back() {
        this.location.back();
    }

    onStatusChange(event){
      this.os.updateOrder({status: event.value}, this.activeOrder.id).subscribe(()=>{
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:'Status updated'
        })
      },
      (err)=>{
        this.messageService.add({
          severity:'danger',
          summary:'Error',
          detail:'Status not updated'
        })
      console.log(err)
      })

    }

    private _populateOrder() {
        this.activeRoute.params.subscribe((params) => {
            if (params.id) {
                this.os.getOrder(params.id).subscribe((order) => {
                    this.activeOrder = order;
                    this.selectedStatus = order.status;
                });

                console.log(this.activeOrder);

            }


        });
    }
    private mapOrderStatus() {
       this.orderStatuses = Object.keys(ORDER_STATUS).map((key)=>{
          return{
            id: key,
            label: ORDER_STATUS[key].label,
            color: ORDER_STATUS[key].color

          }
        })
    }
}
