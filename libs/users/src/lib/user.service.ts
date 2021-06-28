import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from './models/user.model';
import { environment} from 'environments/environment'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  fetchUsers(): Observable<{success:boolean,message: string, users: user[]}>{
    return this.http.get<{success:boolean,message: string, users: user[]}>(`${environment.APi_URL}/users`);
  }
  fetchUsersbyid(userid:String): Observable<{success:boolean,message: string, users: user}>{
    return this.http.get<{success:boolean,message: string, users: user}>(`${environment.APi_URL}/users/${userid}`);
  }
  fetchUserscount(): Observable<{success:boolean, count: user[]}>{
    return this.http.get<{success:boolean, count: user[]}>(`${environment.APi_URL}/users/get/userCounts`);
  }
  addUser(userdata:user): Observable<{success:boolean,message: string, users: user[]}>{
    return this.http.post<{success:boolean,message: string,users:user[]}>(`${environment.APi_URL}/users/createUser`, userdata);
  }

  deleteUser(userid:String): Observable<{success:boolean,message: string, users: user[]}>{
    return this.http.delete<{success:boolean,message: string,users:user[]}>(`${environment.APi_URL}/users/delete/${userid}`);
  }
  updateUser(userid:String,userdata:user): Observable<{success:boolean,message: string, users: user[]}>{
    return this.http.put<{success:boolean,message: string,users:user[]}>(`${environment.APi_URL}/users/update/${userid}`,userdata );
  }

}

