import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartsService } from './services/carts.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CartPageComponent } from './cart-page/cart-page.component';
import {DividerModule} from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import {InputNumberModule} from 'primeng/inputnumber';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from 'primeng/toast';
import { CheckoutComponent } from './checkout/checkout.component';
export const ordersRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule,BrowserAnimationsModule, RouterModule,HttpClientModule,InputTextModule,DividerModule,DropdownModule,ToastModule,TagModule,InputNumberModule,RippleModule,ButtonModule,AccordionModule,FormsModule,ReactiveFormsModule],
    providers:[MessageService,ConfirmationService],
    declarations: [
      CartPageComponent,
      CheckoutComponent
    ],
    exports: [
      CartPageComponent,
      CheckoutComponent
    ]
})
export class OrdersModule {

constructor(private cartServices: CartsService){
this.cartServices.initcart();
}

}
