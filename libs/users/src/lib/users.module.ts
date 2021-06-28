import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

import { MessagesModule } from 'primeng/messages';
import {RippleModule} from 'primeng/ripple';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {DividerModule} from 'primeng/divider';
import {FieldsetModule} from 'primeng/fieldset';
import {TableModule} from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule} from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import {ToastModule} from 'primeng/toast';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import{ CarouselModule } from 'primeng/carousel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import  { PasswordModule} from 'primeng/password';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputMaskModule } from 'primeng/inputmask';
import { ChipsModule } from  'primeng/chips';
import { CalendarModule} from 'primeng/calendar';
import {InputSwitchModule} from 'primeng/inputswitch';
import {EditorModule} from 'primeng/editor';
import {FileUploadModule} from 'primeng/fileupload';
import { TagModule } from 'primeng/tag';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {TooltipModule} from 'primeng/tooltip';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'

 const usersRoutes: Route[] = [
  {
    path:'login',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  }

];

@NgModule({
    imports: [CommonModule, RouterModule,HttpClientModule,RouterModule.forChild(usersRoutes),
      MessagesModule,
      CardModule,
      ButtonModule,
      RippleModule,
      ToolbarModule,
      DividerModule,
      FieldsetModule,
      TableModule,
      RadioButtonModule,
      DialogModule,
      InputNumberModule,
      DropdownModule,
      InputTextModule,
      ColorPickerModule,
      ToastModule,
      ConfirmPopupModule,
      ConfirmDialogModule,
      RatingModule,
      CarouselModule,
      AutoCompleteModule,
      PasswordModule,
      MultiSelectModule,
      InputMaskModule,
      ChipsModule,
      CalendarModule,
      InputSwitchModule,
      EditorModule,
      FileUploadModule,
      TagModule,
      SidebarModule,
      SkeletonModule,
      TooltipModule,
      ReactiveFormsModule,
      FormsModule
    ],
    declarations: [
      LoginComponent,
      SignupComponent
    ]
})
export class UsersModule {}
