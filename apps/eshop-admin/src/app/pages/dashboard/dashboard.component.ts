import { order, OrdersService } from '@aditya/orders';
import { product, ProductService } from '@aditya/products';
import { user, UserService } from '@aditya/users';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'eshop-admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    Subscription$: Subject<any> = new Subject();
    countproduct!: product[];
    countuser!: user[];
    countorder!: order;
    products!: product[];
    orderpending: any = [];
    public items!: MenuItem[];
    home!: MenuItem;
    constructor(
        private productService: ProductService,
        private userService: UserService,
        private orderService: OrdersService
    ) {}
    ngOnDestroy() {
        this.Subscription$.next();
        this.Subscription$.complete();
    }

    ngOnInit(): void {
        this.fetchDashboardData();
        this.fetchUserData();
        this.fetchordersData();
        this.items = [{ label: 'Dashboard' }];
        this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
    }

    fetchDashboardData() {
        this.productService
            .fetchproductcount()
            .pipe(takeUntil(this.Subscription$))
            .subscribe((res) => {
                this.countproduct = res.count;
            });
    }
    fetchUserData() {
        this.userService
            .fetchUserscount()
            .pipe(takeUntil(this.Subscription$))
            .subscribe((res) => {
                this.countuser = res.count;
            });
    }
    fetchordersData() {
        this.orderService
            .fetchOrderscount()
            .pipe(takeUntil(this.Subscription$))
            .subscribe((res) => {
                this.countorder = res.count;
            });
        this.orderService
            .fetchOrders()
            .pipe(takeUntil(this.Subscription$))
            .subscribe((res) => {
                res.orders.map((pending) => {
                    if (pending.status == 'Pending') {
                        this.orderpending.push(pending);
                    }
                });
            });
        // console.log(this.orderpending)
    }
}
