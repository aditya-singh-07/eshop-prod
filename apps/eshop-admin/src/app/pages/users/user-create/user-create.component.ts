import { user, UserService } from '@aditya/users';
import { Location } from '@angular/common';
import * as i18nIsoCountries from 'i18n-iso-countries';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare const require: (arg0: string) => i18nIsoCountries.LocaleData;
@Component({
    selector: 'eshop-admin-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit, OnDestroy {
    Subscription$: Subject<any> = new Subject();
    mode: boolean = false;
    userid: any;
    subheader: string = 'You can add user';
    form!: FormGroup;
    isFormSubmited: boolean = false;
    selectedCountry: any;
    countries: any = [];
    public items!: MenuItem[];
    edituser!: MenuItem;

    constructor(
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private userService: UserService,
        private router: Router,
        public routeractivate: ActivatedRoute,
        private location: Location
    ) {}
    ngOnDestroy() {
        this.Subscription$.next();
        this.Subscription$.complete();
    }
    getcountry() {
        i18nIsoCountries.registerLocale(require('i18n-iso-countries/langs/en.json'));
        this.countries = Object.entries(
            i18nIsoCountries.getNames('en', { select: 'official' })
        ).map((country) => {
            return {
                id: country[0],
                name: country[1]
            };
        });
    }

    ngOnInit(): void {
        this.edituser = { icon: 'pi pi-users', routerLink: '/users' };

        this.forminit();
        this.getcountry();
        this.routeractivate.paramMap
            .pipe(takeUntil(this.Subscription$))
            .subscribe((paramMap: ParamMap) => {
                if (paramMap.has('id')) {
                    // this.fetchproduct();
                    this.mode = true;
                    this.subheader = 'You can Edit User';
                    this.userid = paramMap.get('id');
                    this.userService.fetchUsersbyid(this.userid).subscribe((fetchData) => {
                        this.userform.passwordhash.setValidators([]);
                        this.userform.passwordhash.updateValueAndValidity();
                        this.userform.name.setValue(fetchData.users.name);
                        this.userform.email.setValue(fetchData.users.email);
                        this.userform.passwordhash.setValue(fetchData.users.passwordhash);
                        this.userform.phone.setValue(fetchData.users.phone);
                        this.userform.street.setValue(fetchData.users.street);
                        this.userform.apartment.setValue(fetchData.users.apartment);
                        this.userform.city.setValue(fetchData.users.city);
                        this.userform.zipcode.setValue(fetchData.users.zipcode);
                        this.userform.country.setValue(fetchData.users.country);
                        this.userform.isAdmin.setValue(fetchData.users.isAdmin);
                    });
                }
            });
        if (this.mode) {
  
            this.items = [   
              { label: 'Users' },
              { label: 'Edit User' }
            ];
        } else {
            this.items = [{ label: 'Add User' }];
        }
    }

    forminit() {
        this.form = this.fb.group({
            name: ['', { validators: [Validators.required, Validators.minLength(3)] }],
            email: ['', [Validators.required, Validators.email]],
            passwordhash: ['', { validators: [Validators.required] }],
            phone: ['', { validators: [Validators.required] }],
            street: ['', { validators: [Validators.required, Validators.minLength(3)] }],
            apartment: ['', { validators: [Validators.required, Validators.minLength(3)] }],
            city: ['', { validators: [Validators.required] }],
            zipcode: ['', { validators: [Validators.required] }],
            country: ['', { validators: [Validators.required] }],
            isAdmin: [false]
        });
    }

    get userform() {
        return this.form.controls;
    }

    onSubmit() {
        this.isFormSubmited = true;
        if (!this.mode) {
            if (this.form.invalid) {
                return;
            }
            // const UserformData: any = new FormData();
            // Object.keys(this.userform).map((key) => {
            //   UserformData.append(key, this.userform[key].value);
            // });

            const userformData: user = {
                name: this.userform.name.value,
                email: this.userform.email.value,
                passwordhash: this.userform.passwordhash.value,
                phone: this.userform.phone.value,
                street: this.userform.street.value,
                apartment: this.userform.apartment.value,
                city: this.userform.city.value,
                zipcode: this.userform.zipcode.value,
                country: this.userform.country.value,
                isAdmin: this.userform.isAdmin.value
            };
            this.addUserData(userformData);
        } else {
            const userformData: user = {
                name: this.userform.name.value,
                email: this.userform.email.value,
                passwordhash: this.userform.passwordhash.value,
                phone: this.userform.phone.value,
                street: this.userform.street.value,
                apartment: this.userform.apartment.value,
                city: this.userform.city.value,
                zipcode: this.userform.zipcode.value,
                country: this.userform.country.value,
                isAdmin: this.userform.isAdmin.value
            };
            // const userformData: any = new FormData();
            // Object.keys(this.userform).map((key) => {
            //   userformData.append(key, this.userform[key].value);
            // });
            this.userService
                .updateUser(this.userid, userformData)
                .pipe(takeUntil(this.Subscription$))
                .subscribe(
                    (userUpdatedData) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'success',
                            detail: userUpdatedData.message
                        });
                        timer(1000)
                            .toPromise()
                            .then(() => {
                                this.location.back();
                            });
                    },
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'User cannot be Updated'
                        });
                    }
                );
        }
    }
    addUserData(UserformData: user) {
        this.userService
            .addUser(UserformData)
            .pipe(takeUntil(this.Subscription$))
            .subscribe(
                (userData) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'success',
                        detail: userData.message
                    });
                    timer(1000)
                        .toPromise()
                        .then(() => {
                            this.location.back();
                        });
                },
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'User cannot be created'
                    });
                }
            );
    }
}
