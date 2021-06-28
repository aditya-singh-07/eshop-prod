import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { user, UserService } from '@aditya/users';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'eshop-admin-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
    Subscription$: Subject<any> = new Subject();
    userlist: user[] = [];
    public items!: MenuItem[];
    user!: MenuItem;

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService,
        public routeractivate: ActivatedRoute
    ) {}
    ngOnDestroy() {
        this.Subscription$.next();
        this.Subscription$.complete();
    }
    ngOnInit(): void {
        this.fetchUserdata();
        this.items = [{ label: 'Users' }];
        this.user = { icon: 'pi pi-users', routerLink: '/users' };
    }

    private fetchUserdata() {
        this.userService
            .fetchUsers()
            .pipe(takeUntil(this.Subscription$))
            .subscribe((res) => {
                this.userlist = res.users;
            });
    }

    deleteUser(userid: string) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userService
                    .deleteUser(userid)
                    .pipe(takeUntil(this.Subscription$))
                    .subscribe(
                        (deleteData) => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'success',
                                detail: deleteData.message
                            });
                            this.fetchUserdata();
                        },
                        () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'User cannot be deleted'
                            });
                        }
                    );
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'cancelled'
                });
            }
        });
    }


}
