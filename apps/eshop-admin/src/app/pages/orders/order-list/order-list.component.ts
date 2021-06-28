import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { order, OrdersService } from '@aditya/orders';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { STATUS } from '../const';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'eshop-admin-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {
    Subscription$: Subject<any> = new Subject();
    orders = STATUS;
    orderList: order[] = [];
    public items!: MenuItem[];
    order!: MenuItem;
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private router: Router,
        private orderService: OrdersService,
        private location: Location,
        public routeractivate: ActivatedRoute
    ) {}
    ngOnDestroy() {
        this.Subscription$.next();
        this.Subscription$.complete();
    }

    ngOnInit(): void {
        this.fetchOrderdata();
    }
    private fetchOrderdata() {
        this.orderService
            .fetchOrders()
            .pipe(takeUntil(this.Subscription$))
            .subscribe((res) => {
                this.orderList = res.orders;
                console.log(this.orderList)
            });

        this.items = [{ label: 'orders' }];
        this.order = { icon: 'pi pi-list', routerLink: '/orders' };
    }

    deleteOrder(orderid: string) {
        this.orderService
            .deleteOrder(orderid)
            .pipe(takeUntil(this.Subscription$))
            .subscribe(
                (deletedorder) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'success',
                        detail: deletedorder.message
                    });
                    this.fetchOrderdata();
                    // timer(1000)
                    //     .toPromise()
                    //     .then(() => {
                    //       this.location.back()

                    //     });
                },

                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Order cannot be deleted'
                    });
                }
            );
    }
}
