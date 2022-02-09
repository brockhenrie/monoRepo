import { LocalstorageService } from './../../services/localstorage.service';
import { User } from '../../models/user.model';
import { FormGroup, Validators } from '@angular/forms';
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    authMessage!: string;
    authError!: boolean;
    form!: FormGroup;
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private ms: MessageService,
        private ls: LocalstorageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._initForm();
    }

    onLogin() {
        const loginData = {
            email: this.form.value.email,
            password: this.form.value.password
        };
        this.auth.login(loginData.email, loginData.password).subscribe(
            (user: User) => {
                const token = user.token;
                this.authError = false;
                this.ls.setToken(token as string);
                this.router.navigate(['/']);
            },
            (err: HttpErrorResponse) => {
                console.log(err);
                if (err.status !== 400) {
                    this.authError = true;
                    this.authMessage =
                        'Error in the Server, please try again later';
                }
                if (err.message === 'Email invalid!') {
                    this.authError = true;
                    this.authMessage = err.message;
                }
            }
        );
    }

    get loginForm() {
        return this.form.controls;
    }

    private _initForm() {
        this.form = this.fb.group({
            email: ['admin@test.com', [Validators.required, Validators.email]],
            password: ['B@ckspace', [Validators.required]]
        });
    }
}
