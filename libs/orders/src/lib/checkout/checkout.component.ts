import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as i18nIsoCountries from "i18n-iso-countries";
import { Subject } from "rxjs";
import { user, UserService } from '@aditya/users';
import { MessageService } from "primeng/api";
import { takeUntil } from "rxjs/operators";
import { CheckoutService } from "../services/checkout.service";
import { order } from "../models/order.model";
import { orderitems } from "../models/orderitems.model";
import { CartsService } from "../services/carts.service";
import { OrdersService } from "../orders.service";
import { Router } from "@angular/router";
declare const require: (arg0: string) => i18nIsoCountries.LocaleData;
@Component({
  selector: "orders-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  isAuth: boolean = false;
  userid:string="60d99ffcb9be7c1894bb851d";
  Orderitem:any=[];
  form!: FormGroup;
  isFormSubmited: boolean = false;
  selectedCountry: any;
  countries: any = [];
  Subscription$: Subject<any> = new Subject();
  constructor(private router: Router, private fb: FormBuilder,private messageService:MessageService,private cartService:CartsService,private orderService:OrdersService,private checkoutService:CheckoutService) {}

  ngOnInit(): void {
    this.forminit();
    this.getcart();
    
  }
  forminit() {
    this.form = this.fb.group({
      name: [
        "",
        { validators: [Validators.required, Validators.minLength(3)] },
      ],
      email: ["", [Validators.required, Validators.email]],

      phone: ["", { validators: [Validators.required] }],
      street: [
        "",
        { validators: [Validators.required, Validators.minLength(3)] },
      ],
      apartment: [
        "",
        { validators: [Validators.required, Validators.minLength(3)] },
      ],
      status:["Pending"],
      city: ["", { validators: [Validators.required] }],
      zipcode: ["", { validators: [Validators.required] }],
      country: ["", { validators: [Validators.required] }],
    });
    this.getcountry();
  }

  get userform() {
    return this.form.controls;
  }
  getcountry() {
    i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
        i18nIsoCountries.getNames('en', { select: 'official' })
    ).map((country) => {
        return {
            id: country[0],
            name: country[1]
        };
    });
}

getcart(){
  const getcart=this.cartService.getCart();
    this.Orderitem=getcart.items?.map(item =>{
      return {
        product:item.Productid,
        quantity:item.quantity
      }
    })
}
onSubmit() {
  this.isFormSubmited = true;
      if (this.form.invalid) {
          return;
      }
      // const UserformData: any = new FormData();
      // Object.keys(this.userform).map((key) => {
      //   UserformData.append(key, this.userform[key].value);
      // });

      const order: order = {
        orderitems:this.Orderitem,
        shippingAddress1:this.userform.street.value,
        shippingAddress2:this.userform.apartment.value,
        city:this.userform.city.value,
        zipcode:this.userform.zipcode.value,
        country:this.userform.country.value,
        phone:this.userform.phone.value,
        status:this.userform.status.value,
        user:this.userid,
        dateOrder:`${Date.now()}`
      };
      this.addUserData(order);
 
}
addUserData(orderdata: any) {
  this.orderService
      .addOrder(orderdata)
      .pipe(takeUntil(this.Subscription$))
      .subscribe(
          (order) => {
            this.cartService.cartempty();
              this.messageService.add({
                  severity: 'success',
                  summary: 'success',
                  detail: order.message
              });
              this.router.navigateByUrl('cart')
              // timer(1000)
              //     .toPromise()
              //     .then(() => {
              //         this.location.back();
              //     });
          },
          (err) => {
              this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Order cannot be created'
              });
          }
      );
    
}



}
