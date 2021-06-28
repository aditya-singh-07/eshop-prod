import { Cartitems } from '@aditya/orders';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { CartsService } from '../services/carts.service';
import { product, ProductService } from '@aditya/products'
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartitem: any[]=[];
  product:any;

  Subscription$: Subject<any> = new Subject();
  totalPrice: any=0;
  constructor(private primengConfig: PrimeNGConfig,private cartService:CartsService,private productService: ProductService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
   this.cartService.carts$.pipe(takeUntil(this.Subscription$)).subscribe(cartitems =>{
     this.cartitem=[];
      cartitems.items?.map(data =>{
       this.productService.fetchProductbyall(data?.Productid).subscribe(res =>{
          this.cartitem?.push({product:res.products,quantity:data.quantity})
          this.cartService.getTotal();
          this.cartService.total$.pipe(takeUntil(this.Subscription$)).subscribe(data =>{
            this.totalPrice=data;
          })
    
        });
      });
 
    })
   

  }

  deletecart(cartitems: any){
   this.cartService.deletecart(cartitems?.product.id);

  }

  ngOnDestroy() {
    this.Subscription$.next();
    this.Subscription$.complete();
  }


  onUpdatequantity(event:any,cartitems: any){
    // console.log(cartitems)
    this.cartService.setCart({Productid:cartitems.product.id,quantity:event.value},true)
    
  }
}
