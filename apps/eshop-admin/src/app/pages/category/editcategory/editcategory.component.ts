import { category, CategoryService } from '@aditya/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParamMap } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'eshop-admin-editcategory',
    templateUrl: './editcategory.component.html',
    styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit, OnDestroy {
    Subscription$: Subject<any> = new Subject();
    form!: FormGroup;
    catid: any;
    categoryobj!: category;
    iconlist!: any[];
    public items!: MenuItem[];
    editcategory!: MenuItem;
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private categoryService: CategoryService,
        private fb: FormBuilder,
        private router: Router,
        public routeractivate: ActivatedRoute
    ) {}
    ngOnDestroy() {
        this.Subscription$.next();
        this.Subscription$.complete();
    }
    icon() {
        this.iconlist = [
            { name: 'amazon', url: 'pi-amazon' },
            { name: 'android', url: 'pi-android' },
            { name: 'briefcase', url: 'pi-briefcase' },
            { name: 'calendar', url: 'pi-calendar' },
            { name: 'cog', url: 'pi-cog' },
            { name: 'compassr', url: 'pi-compass' },
            { name: 'credit-card', url: 'pi-credit-card' },
            { name: 'dollar', url: 'pi-dollar' },
            { name: 'image', url: 'pi-image' },
            { name: 'plus-circle', url: 'pi-plus-circle' },
            { name: 'tags', url: 'pi-tags' },
            { name: 'ticket', url: 'pi-ticket' }
        ];
    }
    ngOnInit(): void {
        this.icon();
        this.items = [{ label: 'Category' }, { label: 'Edit Category' }];

        this.form = this.fb.group({
            name: ['', { validators: [Validators.required, Validators.minLength(3)] }],
            icon: ['', { validators: [Validators.required, Validators.minLength(3)] }],
            color: ['', Validators.required]
        });

        this.routeractivate.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.catid = paramMap.get('id');
                this.categoryService
                    .fetchCategoriesbyid(this.catid)
                    .pipe(takeUntil(this.Subscription$))
                    .subscribe((fetchData) => {
                        this.categoryobj = {
                            name: fetchData.category.name,
                            icon: fetchData.category.icon,
                            color: fetchData.category.color
                        };
                        this.form.setValue({
                            name: this.categoryobj.name,
                            icon: this.categoryobj.icon,
                            color: this.categoryobj.color
                        });
                    });
            }
        });
        this.editcategory = { icon: 'pi pi-pencil', routerLink: `/categories/${this.catid}` };
    }
    get categoryform() {
        return this.form.controls;
    }
    onupdate() {
        const formdata = {
            name: this.categoryform.name.value,
            icon: this.categoryform.icon.value,
            color: this.categoryform.color.value
        };
        this.categoryService
            .updateCategory(this.catid, formdata)
            .pipe(takeUntil(this.Subscription$))
            .subscribe(
                (categoryData) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'success',
                        detail: categoryData.message
                    });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'category cannot be Updated'
                    });
                }
            );

        this.router.navigateByUrl('/categories/:id', { skipLocationChange: true }).then(() => {
            this.router.navigate(['categories']);
        });
    }

    clear(table: Table) {
        table.clear();
    }
}
