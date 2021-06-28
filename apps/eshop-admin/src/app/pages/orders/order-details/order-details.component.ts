import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import * as i18nIsoCountries from 'i18n-iso-countries';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { order, OrdersService } from '@aditya/orders';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { STATUS } from '../const';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
declare const require: (arg0: string) => i18nIsoCountries.LocaleData;
@Component({
    selector: 'eshop-admin-order-ldetails',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderLdetailsComponent implements OnInit, OnDestroy {
    Subscription$: Subject<any> = new Subject();
    mode: boolean = false;
    orders = STATUS;
    subheader: string = 'You can add Order';
    form!: FormGroup;
    isFormSubmited: boolean = false;
    imageData: any;
    orderid: any;
    Order: order[] | any = [];
    countries: any = [];
    selected: any;
    public items!: MenuItem[];
    editorder!: MenuItem;
    constructor(
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router,
        private orderService: OrdersService,
        public routeractivate: ActivatedRoute,
        private location: Location
    ) {}
    ngOnDestroy() {
        this.Subscription$.next();
        this.Subscription$.complete();
    }
    ngOnInit(): void {
        this.forminit();
        this.items = [{ label: 'orders' }, { label: 'Edit Order' }];
        this.editorder = { icon: 'pi pi-shopping-cart', routerLink: `/orders/${this.orderid}` };

        this.orders = Object.keys(STATUS).map((element) => {
            return {
                id: element,
                name: STATUS[element].label
            };
        });

        // Object.keys(STATUS).findIndex((element) => {
        //    console.log(Object.values(STATUS[element]))

        //   } )

        this.routeractivate.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                // this.fetchproduct();
                this.mode = true;
                this.subheader = 'You can see order details';
                this.orderid = paramMap.get('id');
                this.orderService
                    .fetchOrderbyid(this.orderid)
                    .pipe(takeUntil(this.Subscription$))
                    .subscribe((fetchData) => {
                        this.Order = fetchData.orders;
                        console.log(fetchData)
                    
                        // this.orderform.orderitems.setValue(fetchData.orders.orderitems);
                        // this.orderform.shippingAddress1.setValue(fetchData.orders.shippingAddress1);
                        // this.orderform.shippingAddress2.setValue(fetchData.orders.shippingAddress2);
                        // this.orderform.city.setValue(fetchData.orders.city);
                        // this.orderform.zipcode.setValue(fetchData.orders.zipcode);
                        // this.orderform.country.setValue(fetchData.orders.country);
                        // this.orderform.phone.setValue(fetchData.orders.phone);
                        this.orderform.status.setValue(fetchData.orders.status);
                        // this.orderform.totalPrice.setValue(fetchData.orders.totalPrice);
                        // this.orderform.user.setValue(fetchData.orders.user);
                        // this.orderform.dateOrder.setValue(fetchData.orders.dateOrder);
                    });
            }
        });
    }

    orderstatus(event: any) {
        this.orderService
            .updateOrder(this.orderid, { status: event.value })
            .pipe(takeUntil(this.Subscription$))
            .subscribe(
                (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'success',
                        detail: res.message
                    });
                    timer(1000)
                        .toPromise()
                        .then(() => {
                            this.location.back();
                        });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Order cannot be Updated'
                    });
                }
            );
    }

    forminit() {
        this.form = this.fb.group({
            // orderitems: ['', { validators: [Validators.required] }],
            // shippingAddress1: ['', { validators: [Validators.required] }],
            // shippingAddress2: ['', { validators: [Validators.required] }],
            // city: ['', { validators: [Validators.required, Validators.minLength(3)] }],
            // zipcode: ['', { validators: [Validators.required] }],
            // country: ['', { validators: [Validators.required] }],
            // phone: ['', { validators: [Validators.required] }],
            status: ['', { validators: [Validators.required] }]
            // totalPrice: ['', { validators: [Validators.required] }],
            // user: ['', { validators: [Validators.required] }],
            // dateOrder: ['']
        });
    }
    get orderform() {
        return this.form.controls;
    }
}
