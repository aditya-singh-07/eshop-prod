import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { LocalstorageService } from '../localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    expireIn!: number;
    atobDecode: any;
   
    constructor(
        private LocalStorageService: LocalstorageService,
        private router: Router,
        private AuthService:AuthService,
        private messageService: MessageService
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const Token = this.LocalStorageService.getToken('TOKEN_KEY');
        if (Token) {
            this.atobDecode = JSON.parse(atob(Token.split('.')[1]));
            if (this.atobDecode.isAdmin && !this.expiredTime(this.atobDecode.exp)) {
                // console.log(this.atobDecode);
    
                return true;
            }
        }
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'User Are Not Authorized to Admin Panel '
        });
        
        this.router.navigateByUrl('login');
        return false;
    }
    private expiredTime(expire: any) {
        this.expireIn = expire;
        return Math.floor(new Date().getTime() / 1000) >= expire;
    }

}
