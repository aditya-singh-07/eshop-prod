import { user } from '@aditya/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  addcheckout(formdata: user): Observable<{success:boolean,message: string, users: user[]}>{
    return this.http.post<{success:boolean,message: string,users:user[]}>(`${environment.APi_URL}/users/createUser`, formdata);
  }
}
