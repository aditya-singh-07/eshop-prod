import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { ProductDetailsComponent } from "@aditya/products";
import { ProductListComponent } from "@aditya/products";
import { HomeComponent } from "./pages/home/home.component";
import { CartPageComponent } from "libs/orders/src/lib/cart-page/cart-page.component";
import { CheckoutComponent } from "libs/orders/src/lib/checkout/checkout.component";


const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'product',component:ProductListComponent},
    {path:'productDetails/:id',component:ProductDetailsComponent},
    {path:'cart',component:CartPageComponent},
    {path:'checkout',component:CheckoutComponent},
    {path:'**',redirectTo:'home', pathMatch: 'full'}
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }