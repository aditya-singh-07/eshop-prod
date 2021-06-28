import { AuthService } from '@aditya/users';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'eshop-admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {
  constructor(private AuthService:AuthService,private router:Router) { }

  // ngOnInit(): void {
  // }
logout(){
  this.AuthService.logout();
  this.router.navigateByUrl('login');
}
}
