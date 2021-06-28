import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { category } from "@aditya/products";
import { ProductService } from "../services/product.service";
import { product } from "../models/product";
import { Cartitems, CartsService } from "@aditya/orders";
@Component({
  selector: "products-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  Subscription$: Subject<any> = new Subject();
  category!: category[];
  product!: product[];
  brands: any = [];
  sum: any = 0;
  rating: any;
  selectedValues: string[] = [];
  checked: boolean = false;
  categoryFilterid!: any[];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService:CartsService
  ) {}

  ngOnInit(): void {
    this.fetchcategory();
    this.fetchBrand();
    this.fetchproduct();
    this.filterproduct();
  }

  fetchcategory() {
    this.categoryService
      .fetchCategories()
      .pipe(takeUntil(this.Subscription$))
      .subscribe((fetchCategory) => {
        this.category = fetchCategory.category;
      });
  }
  fetchproduct(category?: string[]) {
    this.productService
      .fetchproduct(category)
      .pipe(takeUntil(this.Subscription$))
      .subscribe((fetchProduct) => {
        this.product = fetchProduct.products;
      });
  }

  fetchBrand() {
    this.productService
      .fetchproduct()
      .pipe(takeUntil(this.Subscription$))
      .subscribe((fetchBrand) => {
        this.brands = fetchBrand.products;
        fetchBrand.products.map((res) => {
          this.sum = this.sum + res.rating;
          this.rating = this.sum / this.product?.length;
          this.brands.push(res.brand);
        });
      });
  }

  ngOnDestroy() {
    this.Subscription$.next();
    this.Subscription$.complete();
  }

  filterproduct() {
    this.categoryFilterid = this.category?.filter((data) => data.checked)
      .map((category) => category.id);
    this.fetchproduct(this.categoryFilterid);
  }
  addtocart(productid:any){
    let cartitem: Cartitems={
      Productid:productid,
      quantity:1
    };
    this.cartService.setCart(cartitem);
  }

}
