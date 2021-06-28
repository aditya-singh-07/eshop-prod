import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  LocalStorageSet(Token: string){
    localStorage.setItem('TOKEN_KEY', Token);
  }
  getToken(value:string){
    return localStorage.getItem(value);
  }
  removeToken(value:string){
    localStorage.removeItem(value);
  }
}
