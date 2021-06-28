import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../localstorage.service';
import { environment } from '@aditya/env/environment';

@Injectable()
export class authInterceptor implements HttpInterceptor {
    constructor(private LocalStorageService: LocalstorageService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const Token = this.LocalStorageService.getToken('TOKEN_KEY');
        const API_URL = request.url.startsWith(environment.APi_URL);
        
        if (Token && API_URL) {
           request= request.clone({
                setHeaders: {
                    Authorization: `Bearer ${Token}`
                }
            });
        }
        return next.handle(request);
    }
}
