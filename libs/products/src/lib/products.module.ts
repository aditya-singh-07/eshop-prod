import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {AccordionModule} from 'primeng/accordion';
import {RatingModule} from 'primeng/rating';
import {ButtonModule} from 'primeng/button';
import {GalleriaModule} from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import {CheckboxModule} from 'primeng/checkbox';
import {DividerModule} from 'primeng/divider';
import {  CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { RouterModule } from '@angular/router';
import {RippleModule} from 'primeng/ripple';
import {InputNumberModule} from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
@NgModule({
    imports: [
      CommonModule,
      AccordionModule,
      RatingModule,
      FormsModule,
      RouterModule,
      TagModule,
      ButtonModule,
      CardModule,
      GalleriaModule,
      DividerModule,
      CheckboxModule,
      RippleModule,
      InputNumberModule,
      ToastModule
    
    
    ],
    declarations: [
      ProductListComponent,
      ProductDetailsComponent
    ],
    exports:[
      ProductListComponent,
      ProductDetailsComponent
    ],
    providers:[MessageService]
})
export class ProductsModule {}
