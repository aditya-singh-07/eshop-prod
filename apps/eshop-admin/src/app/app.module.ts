import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgPrimeModule } from './app.ngPrime.module';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DisplayComponent } from './shared/display/display.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatRippleModule} from '@angular/material/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MessageService} from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { EditcategoryComponent } from './pages/category/editcategory/editcategory.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductCreateComponent } from './pages/products/product-create/product-create.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { OrderLdetailsComponent } from './pages/orders/order-details/order-details.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { authInterceptor } from '@aditya/users';

@NgModule({
    declarations: [AppComponent,DashboardComponent,SidebarComponent,DisplayComponent,CategoryComponent,EditcategoryComponent,ProductListComponent,ProductCreateComponent,UserCreateComponent,UserListComponent,OrderLdetailsComponent,OrderListComponent],
    imports: [BrowserModule, BrowserAnimationsModule,RouterModule,ReactiveFormsModule,FormsModule,MatFormFieldModule,AppRoutingModule,MatRippleModule,NgPrimeModule,HttpClientModule],
    providers: [MessageService,ConfirmationService, {provide:HTTP_INTERCEPTORS, useClass:authInterceptor,multi:true}],
    bootstrap: [AppComponent]
})
export class AppModule {}
