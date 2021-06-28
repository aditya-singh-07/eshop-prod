import { environment } from '@aditya/env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    API_URL = environment.APi_URL;
    constructor(private http: HttpClient, private LocalStorageService: LocalstorageService,private router:Router) {}

    signin(email: string, passwordhash: string): Observable<{ message: string; token: string }> {
        return this.http.post<{ message: string; token: string }>(`${this.API_URL}/users/signin`, {
            email: email,
            passwordhash: passwordhash
        });
    }
    logout() {
        this.LocalStorageService.removeToken('TOKEN_KEY');
        
    }

}
