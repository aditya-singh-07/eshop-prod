import { Component, OnInit } from '@angular/core';
import { category, CategoryService } from '@aditya/products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'eshop-admin-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    Subscription$: Subject<any> = new Subject();
    form!: FormGroup;
    isFormSubmited: boolean = false;
    categories: category[] = [];
    public items!: MenuItem[];
    category!: MenuItem;
    display: boolean = false;
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private router: Router,
        public routeractivate: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.fetchcategorydata();
        this.form = this.fb.group({
            name: ['', { validators: [Validators.required, Validators.minLength(3)] }],
            icon: ['', { validators: [Validators.required] }],
            color: ['', Validators.required]
        });
        this.items = [{ label: 'Category' }];
        this.category = { icon: 'pi pi-briefcase', routerLink: '/categories' };
    }

    fetchcategorydata() {
        this.categoryService
            .fetchCategories()
            .pipe(takeUntil(this.Subscription$))
            .subscribe((res) => {
                this.categories = res.category;
            });
    }

    showDialog() {
        console.log('clicked');
        this.display = true;
    }

    onSubmit() {
        this.isFormSubmited = true;
        if (this.form.invalid) {
            return;
        }
        const category: category = {
            name: this.categoryform.name.value,
            icon: this.categoryform.icon.value,
            color: this.categoryform.color.value
        };
        console.log(category);
        this.categoryService
            .addCategory(category)
            .pipe(takeUntil(this.Subscription$))
            .subscribe(
                (categoryData) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'success',
                        detail: categoryData.message
                    });
                    this.fetchcategorydata();
                    this.display = false;
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'category cannot be created'
                    });
                }
            );
    }

    get categoryform() {
        return this.form.controls;
    }

    deleteCategory(id: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoryService
                    .deleteCategory(id)
                    .pipe(takeUntil(this.Subscription$))
                    .subscribe(
                        (deleteData) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'success',
                                detail: deleteData.message
                            });
                            this.fetchcategorydata();
                        },
                        () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'category cannot be deleted'
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

    ngOnDestroy() {
        this.Subscription$.next();
        this.Subscription$.complete();
    }
}
