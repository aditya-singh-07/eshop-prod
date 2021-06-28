import { Component, OnInit } from '@angular/core';
import { CartsService } from '@aditya/orders';
@Component({
  selector: 'eshop-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  countItems: number | undefined =0;

  constructor(private cartService:CartsService) { }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    this.cartService.carts$.subscribe(cartcount =>{
      this.countItems=cartcount?.items?.length || 0;
      
    })
  }

}
