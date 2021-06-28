import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { product } from '../models/product';
import { Observable } from 'rxjs';
import { environment} from 'environments/environment'
@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http:HttpClient) { }
  
  addProduct(productdata:product): Observable<{success:boolean,message: string, products: product}>{
    return this.http.post<{success:boolean,message: string,products:product}>(`${environment.APi_URL}/products`, productdata);
  }

  fetchproduct(category?:string[]): Observable<{success:boolean,message: string, products: product[]}>{
    let paramscatid=new HttpParams();
    if(category){
      paramscatid=paramscatid.append('categories', category.join(','))
    }
    return this.http.get<{success:boolean,message: string, products: product[]}>(`${environment.APi_URL}/products/category`, {params:paramscatid});
    // return this.http.get<{success:boolean,message: string, products: product[]}>(`${environment.APi_URL}/products`);
  }
  fetchFeaturedproduct(count:number): Observable<{success:boolean,message: string, products: product[]}>{
    return this.http.get<{success:boolean,message: string, products: product[]}>(`${environment.APi_URL}/products/get/featured/${count}`);
  }
  fetchproductBycategory(category?:String[]):Observable<{success:boolean,message: string, products: product}>{
    return this.http.get<{success:boolean,message: string, products: product}>(`${environment.APi_URL}/products?${category}`)
  }

  fetchproductcount(): Observable<{success:boolean, count: product[]}>{
    return this.http.get<{success:boolean, count: product[]}>(`${environment.APi_URL}/products/get/productsCount`);
  }
  fetchProductbyid(productid:String): Observable<{success:boolean,message: string, products: product}>{
    return this.http.get<{success:boolean,message: string, products: product}>(`${environment.APi_URL}/products/${productid}`);
  }
  fetchProductbyall(productid?:string): Observable<{success:boolean,message: string, products: product}>{
    return this.http.get<{success:boolean,message: string, products: product}>(`${environment.APi_URL}/products/${productid}`);
  }


  deleteProduct(productid:String): Observable<{success:boolean,message: string, products: product}>{
    return this.http.delete<{success:boolean,message: string,products:product}>(`${environment.APi_URL}/products/${productid}`);
  }
  updateProduct(productid:String,productData:product): Observable<{success:boolean,message: string, products: product}>{
    return this.http.put<{success:boolean,message: string,products:product}>(`${environment.APi_URL}/products/${productid}`,productData );
  }

}
