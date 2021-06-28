import { product } from "@aditya/products";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ProductService } from "../services/product.service";
import { map } from 'rxjs/operators';
import { Cartitems, CartsService } from '@aditya/orders';

@Component({
  selector: "products-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  Subscription$: Subject<any> = new Subject();
  product!: product;
  productimages: any=[];
  priceMRP!:any;
  productid!: any;
  quantity:any=1;
  selectedImageUrl!: any;


  constructor(
    private primengConfig: PrimeNGConfig,
    private routeractivate: ActivatedRoute,
    private productService: ProductService,
    private cartService:CartsService,
    private messageService:MessageService
  ) {}
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.routeractivate.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.productid=paramMap.get('id');
        this.fetchproduct();
      }
    });

 

  }
  fetchproduct() {
    this.productService
      .fetchProductbyid(this.productid)
      .pipe(takeUntil(this.Subscription$))
      .subscribe(fetchProduct => {
        this.priceMRP=fetchProduct.products.price;
        this.product = fetchProduct.products;
        this.productimages=fetchProduct.products.images;
        this.selectedImageUrl=this.productimages[0];
       
        
      });

      
  }

  ngOnDestroy() {
    this.Subscription$.next();
    this.Subscription$.complete();
  }

  addtocart(){
    let cartitem: Cartitems={
      Productid:this.productid,
      quantity:this.quantity
    };
   this.cartService.setCart(cartitem);
  }

  buy(){


  }
  changeImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

}
