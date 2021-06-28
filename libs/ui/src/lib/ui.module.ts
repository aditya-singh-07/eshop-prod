import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BannerComponent } from "./banner/banner.component";
import { SliderComponent } from "./slider/slider.component";
import { FeaturedComponent } from "./featured/featured.component";
import { SearchComponent } from "./search/search.component";
import { ProductComponent } from "./product/product.component";
import { TagModule } from "primeng/tag";
import { RippleModule } from "primeng/ripple";
import { ButtonModule } from "primeng/button";
import {GalleriaModule} from 'primeng/galleria';
import { FormsModule } from "@angular/forms";
@NgModule({
  imports: [CommonModule, TagModule, ButtonModule, RippleModule,GalleriaModule,FormsModule],
  declarations: [
    BannerComponent,
    SliderComponent,
    FeaturedComponent,
    SearchComponent,
    ProductComponent
  ],
  exports: [
    BannerComponent,
    SliderComponent,
    FeaturedComponent,
    SearchComponent,
    ProductComponent
 
  ],
})
export class UiModule {}
