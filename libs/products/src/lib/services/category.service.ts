import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { category } from '../models/category';
import { Observable } from 'rxjs';
import { environment} from 'environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  fetchCategories(): Observable<{success:boolean,message: string, category: category[]}>{
    return this.http.get<{success:boolean,message: string, category: category[]}>(`${environment.APi_URL}/categories`);
  }
  fetchCategoriesbyid(categoryid:String): Observable<{success:boolean,message: string, category: category}>{
    return this.http.get<{success:boolean,message: string, category: category}>(`${environment.APi_URL}/categories/${categoryid}`);
  }

  addCategory(categorydata:category): Observable<{success:boolean,message: string, category: category}>{
    return this.http.post<{success:boolean,message: string,category:category}>(`${environment.APi_URL}/categories`, categorydata);
  }

  deleteCategory(categoryid:String): Observable<{success:boolean,message: string, category: category}>{
    return this.http.delete<{success:boolean,message: string,category:category}>(`${environment.APi_URL}/categories/${categoryid}`);
  }
  updateCategory(categoryid:String,categorydata:category): Observable<{success:boolean,message: string, category: category}>{
    return this.http.put<{success:boolean,message: string,category:category}>(`${environment.APi_URL}/categories/${categoryid}`,categorydata );
  }

}
