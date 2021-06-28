import { Injectable, OnDestroy } from "@angular/core";
import { Cart, Cartitems } from "../models/cart.model";
import { ConfirmationService, MessageService } from "primeng/api";
import { BehaviorSubject, Subject } from "rxjs";
import { ProductService } from "@aditya/products";
import { takeUntil } from "rxjs/operators";

export const CART_ITEMS = "cartitems";

@Injectable({
  providedIn: "root",
})
export class CartsService implements OnDestroy {
  Subscription$: Subject<any> = new Subject();
  total$: Subject<any> = new Subject();
  carts$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  isUpdated = new BehaviorSubject<boolean>(false);
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private productService: ProductService
  ) {}

  initcart() {
    const existCart = this.getCart();
    if (!existCart) {
      const cartitems = {
        items: [],
      };
      localStorage.setItem("cartitems", JSON.stringify(cartitems));
    } else {
      this.carts$.next(existCart);
    }
  }

  setCart(cartitems: any, updatecart?: boolean) {
    const cart = this.getCart();
    const existCart = cart.items?.find(
      (data) => data.Productid === cartitems.Productid
    );
    if (existCart) {
      cart.items?.map((items) => {
        if (items.Productid === cartitems.Productid) {
          if (updatecart) {
            items.quantity = cartitems.quantity;
          } else {
            items.quantity = items.quantity + cartitems.quantity;
          }
        }
        return items;
      });
    } else {
      cart.items?.push(cartitems);
    }

    localStorage.setItem(CART_ITEMS, JSON.stringify(cart));
    this.isUpdated.next(false);
    this.carts$.next(cart);
    return cart;
  }

  getCart(): Cart {
    const getitem: any = localStorage.getItem(CART_ITEMS);
    const cart: Cart = JSON.parse(getitem);
    return cart;
  }

  deletecart(productid: string) {
    const cart = this.getCart();
    const Filtercart = cart.items?.filter(
      (item) => item.Productid !== productid
    );
    cart.items = Filtercart;
    localStorage.setItem(CART_ITEMS, JSON.stringify(cart));
    this.carts$.next(cart);
    this.isUpdated.next(true);
    if(cart.items?.length ==0){
      this.total$.next(0);
    
    }
  }

  ngOnDestroy() {
    this.Subscription$.next();
    this.Subscription$.complete();
  }

  getTotal() {
    let sum: any = 0;
    const cart = this.getCart();
    cart.items?.map((data) => {
      this.productService
        .fetchProductbyall(data?.Productid).pipe(takeUntil(this.Subscription$))
        .subscribe((res) => {
          let quantity: any = data.quantity;
          let product: any = res.products.price;
          sum += product * quantity;
          this.total$.next(sum);
        });
    });


  }
  cartempty(){
    const cartitems = {
      items: [],
    };
    localStorage.setItem("cartitems", JSON.stringify(cartitems));
    this.carts$.next(cartitems);
  }
}
