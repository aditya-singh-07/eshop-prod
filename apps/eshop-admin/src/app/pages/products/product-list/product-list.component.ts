import {  product, ProductService } from '@aditya/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'eshop-admin-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
    Subscription$: Subject<any> = new Subject();
    form!: FormGroup;
    Product: product[] = [];
    display: boolean = false;
    public items!: MenuItem[];
    product!: MenuItem;
    constructor(
        private ProductService: ProductService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        public routeractivate: ActivatedRoute
    ) {}
    ngOnDestroy() {
        this.Subscription$.next();
        this.Subscription$.complete();
    }
    ngOnInit(): void {
        this.fetchproduct();
        this.items = [{ label: 'products' }];
        this.product = { icon: 'pi pi-list', routerLink: '/products' };
    }

    private fetchproduct() {
        this.ProductService.fetchproduct()
            .pipe(takeUntil(this.Subscription$))
            .subscribe((productData) => {
                this.Product = productData.products;
            });
    }
    showDialog() {
        this.display = true;
    }

    deleteProduct(productid: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ProductService.deleteProduct(productid)
                    .pipe(takeUntil(this.Subscription$))
                    .subscribe(
                        (deleteData) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'success',
                                detail: deleteData.message
                            });
                            this.fetchproduct();
                        },
                        () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Product cannot be deleted'
                            });
                        }
                    );
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'cancelled'
                });
            }
        });
    }
}
