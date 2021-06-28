import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { UiModule } from '@aditya/ui';
//primeng module
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NgPrimeModule } from './app.ngPrime.module';
import { MaterialModule } from '@aditya/material';
import { ProductsModule} from '@aditya/products';
import { HttpClientModule } from '@angular/common/http';
import { OrdersModule } from '@aditya/orders';
import { MessageComponent } from './shared/message/message.component';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [AppComponent, HomeComponent, FooterComponent, HeaderComponent, NavigationComponent,MessageComponent],
  imports: [BrowserModule,AppRoutingModule,UiModule,BrowserAnimationsModule, LayoutModule,NgPrimeModule,MaterialModule,ProductsModule,HttpClientModule,OrdersModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
