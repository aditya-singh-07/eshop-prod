import { Injectable } from '@angular/core';
import { order } from './models/order.model';
import { environment } from '@aditya/env/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) { }


  fetchOrders(): Observable<{success:boolean,message: string, orders: order[]}>{
    return this.http.get<{success:boolean,message: string, orders: order[]}>(`${environment.APi_URL}/orders`);
  }
  fetchOrderscount(): Observable<{success:boolean, count: order}>{
    return this.http.get<{success:boolean, count: order}>(`${environment.APi_URL}/orders/get/ordersCount`);
  }
  fetchOrderbyid(orderid:String): Observable<{success:boolean,message: string, orders: order}>{
    return this.http.get<{success:boolean,message: string, orders: order}>(`${environment.APi_URL}/orders/${orderid}`);
  }

  addOrder(orderdata:order): Observable<{success:boolean,message: string, orders: order[]}>{
    return this.http.post<{success:boolean,message: string,orders:order[]}>(`${environment.APi_URL}/orders`, orderdata);
  }

  deleteOrder(orderid:String): Observable<{success:boolean,message: string, orders: order[]}>{
    return this.http.delete<{success:boolean,message: string,orders:order[]}>(`${environment.APi_URL}/orders/${orderid}`);
  }
  updateOrder(orderid:String,orderstatus:{status:string}): Observable<{success:boolean,message: string}>{
    return this.http.put<{success:boolean,message: string}>(`${environment.APi_URL}/orders/${orderid}`,orderstatus );
  }
  
}
