import { product, ProductService } from '@aditya/products';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ui-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: product[]=[];
  responsiveOptions:any;
  Subscription$: Subject<any> = new Subject();
  constructor(private productService:ProductService) { }

  ngOnDestroy(): void {
    this.Subscription$.next();
    this.Subscription$.complete();

  }

  ngOnInit(): void {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
      this.fetchProduct();
  }


  fetchProduct(){
    this.productService.fetchproduct().pipe(takeUntil(this.Subscription$)).subscribe(fetchProduct =>{    
      this.products=fetchProduct.products;
   
    })
  }
}

