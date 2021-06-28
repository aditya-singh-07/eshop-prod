import { CategoryService, product, ProductService } from '@aditya/products';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'aditya-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
    Subscription$: Subject<any> = new Subject();
    mode: boolean = false;
    subheader: string = 'You can add product';
    form!: FormGroup;
    isFormSubmited: boolean = false;
    categories!: any[];
    imageData: any;
    productid: any;
    Product: product[] = [];
    public items!: MenuItem[];
    editproduct!: MenuItem;

    constructor(
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private categoryService: CategoryService,
        private ProductService: ProductService,
        private router: Router,
        public routeractivate: ActivatedRoute,
        private location: Location
    ) {}
    ngOnDestroy() {
        this.Subscription$.next();
        this.Subscription$.complete();
    }
    ngOnInit(): void {
        this.forminit();
        this.fetchcategorydata();
        this.routeractivate.paramMap
            .pipe(takeUntil(this.Subscription$))
            .subscribe((paramMap: ParamMap) => {
                if (paramMap.has('id')) {
                    // this.fetchproduct();
                    this.mode = true;
                    this.subheader = 'You can Edit product';
                    this.productid = paramMap.get('id');
                    this.ProductService.fetchProductbyid(this.productid).subscribe((fetchData) => {
                        this.productform.image.setValidators([]);
                        this.productform.image.updateValueAndValidity();
                        this.productform.name.setValue(fetchData.products.name);
                        this.productform.description.setValue(fetchData.products.name);
                        this.imageData = fetchData.products.image;
                        this.productform.brand.setValue(fetchData.products.brand);
                        this.productform.price.setValue(fetchData.products.price);
                        this.productform.category.setValue(fetchData.products.category?.id);
                        this.productform.productStock.setValue(fetchData.products.productStock);
                        this.productform.descriptionDetails.setValue(
                            fetchData.products.descriptionDetails
                        );
                        this.productform.isFeatured.setValue(fetchData.products.isFeatured);

                        // this.ProductformData.append('name', fetchData.products.name)
                        // this.ProductformData.append('description', fetchData.products.name)
                        // this.ProductformData.append('image', fetchData.products.image)
                        // this.ProductformData.append('brand', fetchData.products.brand)
                        // this.ProductformData.append('price', fetchData.products.price)
                        // this.ProductformData.append('category', fetchData.products.category)
                        // this.ProductformData.append('productStock', fetchData.products.productStock)
                        // this.ProductformData.append('descriptionDetails', fetchData.products.descriptionDetails)
                        // this.ProductformData.append('isFeatured', fetchData.products.isFeatured)
                    });
                }
            });
        if (this.mode) {
            this.items = [{ label: 'Product' }, { label: 'Edit product' }];
            this.editproduct = { icon: 'pi pi-list', routerLink: `/products/${this.productid}` };
        } else {
            this.items = [{ label: 'Product' }, { label: 'Add product' }];
            this.editproduct = { icon: 'pi pi-list', routerLink: '/products' };
        }
    }

    fetchcategorydata() {
        this.categoryService
            .fetchCategories()
            .pipe(takeUntil(this.Subscription$))
            .subscribe((res) => {
                this.categories = res.category;
            });
    }
    // private fetchproduct() {
    //     this.ProductService.fetchproduct().subscribe((productData) => {
    //         this.Product = productData.products;
    //     });
    // }

    forminit() {
        this.form = this.fb.group({
            name: ['', { validators: [Validators.required, Validators.minLength(3)] }],
            description: ['', { validators: [Validators.required] }],
            descriptionDetails: ['', { validators: [Validators.required] }],
            image: ['', { validators: [Validators.required] }],
            brand: ['', { validators: [Validators.required, Validators.minLength(3)] }],
            price: ['', { validators: [Validators.required] }],
            category: ['', { validators: [Validators.required] }],
            productStock: ['', { validators: [Validators.required] }],
            isFeatured: [false]
        });
    }
    get productform() {
        return this.form.controls;
    }

    onSubmit() {
        this.isFormSubmited = true;
        if (this.form.invalid) {
            return;
        }
        const ProductformData: any = new FormData();
        Object.keys(this.productform).map((key) => {
            ProductformData.append(key, this.productform[key].value);
        });
        this.addProductData(ProductformData);
        // formData.append('name', this.productform.name.value)
        // formData.append('description', this.productform.name.value)
        // formData.append('image', this.productform.image.value)
        // formData.append('brand', this.productform.brand.value)
        // formData.append('price', this.productform.price.value)
        // formData.append('category', this.productform.category.value)
        // formData.append('productStock', this.productform.productStock.value)
        // formData.append('descriptionDetails', this.productform.descriptionDetails.value)
        // formData.append('isFeatured', this.productform.isFeatured.value)

        // const product=
        // {
        //   name: this.productform.name.value,
        //     description: this.productform.description.value,
        //     image: this.productform.image.value,
        //     brand:this.productform.brand.value,
        //     price: this.productform.price.value,
        //     category: this.productform.category.value,
        //     productStock: this.productform.productStock.value,
        //     descriptionDetails:this.productform.descriptionDetails.value,
        //     isFeatured: this.productform.isFeatured.value
        // };
        // console.log(product)
    }

    private addProductData(ProductData: product) {
        this.ProductService.addProduct(ProductData)
            .pipe(takeUntil(this.Subscription$))
            .subscribe(
                (productData) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'success',
                        detail: productData.message
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
                        detail: 'Product cannot be created'
                    });
                }
            );

        // this.router.navigateByUrl('/products', { skipLocationChange: true }).then(() => {
        //   this.router.navigate(['products']);
        // });
    }

    onUpload(event: any) {
        console.log(event);
        const imagefile = event.target.files[0];
        if (imagefile) {
            this.form.patchValue({ image: imagefile });
            this.form.get('image')?.updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageData = fileReader.result;
            };
            fileReader.readAsDataURL(imagefile);
        }
    }

    onupdate() {
        if (this.form.invalid) {
            return;
        }
        const ProductformData: any = new FormData();
        Object.keys(this.productform).map((key) => {
            ProductformData.append(key, this.productform[key].value);
        });
        this.ProductService.updateProduct(this.productid, ProductformData).subscribe(
            (productUpdatedData) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'success',
                    detail: productUpdatedData.message
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
                    detail: 'Product cannot be Updated'
                });
            }
        );

        // this.router.navigateByUrl('products/:id', { skipLocationChange: true }).then(() => {
        //     this.router.navigate(['product']);
        // });
    }
}
