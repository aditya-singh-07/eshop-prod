import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
@Component({
    selector: 'eshop-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    isFormSubmited: boolean = false;
    isAuth:boolean=false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private messageService: MessageService,
        private router:Router,
        private LocalstorageService:LocalstorageService
    ) {}

    ngOnInit(): void {
        this.forminit();
    
       
     
    }
    forminit() {
        this.form = this.fb.group({
            email: ['', { validators: [Validators.required, Validators.email] }],
            passwordhash: ['', { validators: [Validators.required] }]
        });
    }
    get loginform() {
        return this.form.controls;
    }



    onSubmit() {
      this.isFormSubmited=true;
      if(this.loginform.email.invalid)
      {

          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Email & password is required '
          });
        return;
      }
      
        const formData = {
            email: this.loginform.email.value,
            passwordhash: this.loginform.passwordhash.value
        };
        this.authService.signin(formData.email, formData.passwordhash).subscribe(
            (loginData) => {
              this.LocalstorageService.LocalStorageSet(loginData.token);
              this.isAuth=true;

              this.router.navigateByUrl('/');
                // this.messageService.add({
                //     severity: 'success',
                //     summary: 'success',
                //     detail: loginData.message
                // });
                
            },
            (err: HttpErrorResponse) => {
              console.log(err)
              if(err.status !== 400){
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Error Occur While Signin please try Again later'
              });
              }else{
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Incorrect Password try Again'
              });
              }
        
            }
        );
    }
}
