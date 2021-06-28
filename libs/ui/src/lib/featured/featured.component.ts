import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {takeUntil } from 'rxjs/operators'
import { product, ProductService } from '@aditya/products'
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'ui-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  products!: product[];
  responsiveOptions:any;
  Subscription$: Subject<any> = new Subject();
  constructor(private productService:ProductService,private primengConfig: PrimeNGConfig) { }

  ngOnDestroy(): void {
    this.Subscription$.next();
    this.Subscription$.complete();

  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
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
      this.fetchFeatured();
  }


  fetchFeatured(){
    this.productService.fetchFeaturedproduct(4).pipe(takeUntil(this.Subscription$)).subscribe(fetchfeatured =>{    
      this.products=fetchfeatured.products;
    })
  }
}


