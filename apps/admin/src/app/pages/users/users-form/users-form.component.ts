import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { countries, states, User, UsersService } from '@b-henrie-dev/users';

@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersFormComponent implements OnInit, OnDestroy{
    states = states;
    countries = countries;
    editMode = false;
    category$ = new Observable<User>();
    form!: FormGroup;
    newUser = new User();
    private endSubs$ = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private us: UsersService,
        private messageService: MessageService,
        private location: Location,
        private activeRoute: ActivatedRoute
    ) {}


    ngOnInit(): void {
        this.initForm();
        this._checkEditMode();
    }

    ngOnDestroy(): void {
      this.endSubs();
  }

    onCreateUser() {
        if (this.form.invalid) return;
       this.createUser();
        this.us.createUser(this.newUser).pipe(takeUntil(this.endSubs$)).subscribe((res) => {
            console.log(res);
            this.back();
        });
        this.messageService.add({
            severity: 'success',
            summary: `Success`,
            detail: `User ${this.newUser.name} was created`
        });
        this.form.reset();

        }

    onUpdateUser() {
        if (this.form.invalid) return;
        this.createUser();
        this.us.updateUser(this.newUser).pipe(takeUntil(this.endSubs$)).subscribe((res) => {
            console.log(res);
            this.messageService.add({
              severity: 'success',
              summary: `Success`,
              detail: `User ${this.newUser.name} was created`
          });
            this.form.reset();
            this.back();
        });

    }

    back() {
        this.location.back();
    }

    get userForm() {
        return this.form.controls;
    }

    private _checkEditMode() {
        this.activeRoute.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.us.getUser(params['id']).pipe(takeUntil(this.endSubs$)).subscribe((user) => {
                    this.userForm['name'].setValue(user.name),
                    this.userForm['email'].setValue(user.email),
                    this.userForm['id'].setValue(user.id),
                    this.userForm['phone'].setValue(user.phone),
                    this.userForm['password'].setValue(user.password);
                    this.userForm['isAdmin'].setValue(user.isAdmin);
                    this.userForm['address'].setValue(user.shippingAddress1);
                    this.userForm['address2'].setValue(user.shippingAddress2);
                    this.userForm['city'].setValue(user.city);
                    this.userForm['state'].setValue(user.state);
                    this.userForm['city'].setValue(user.city);
                    this.userForm['zip'].setValue(user.zip);
                    this.userForm['country'].setValue(user.country);
                });
                return;
            }
        });
    }

    private initForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required,Validators.email]],
            id: '',
            phone: ['',Validators.required],
            password: ['',Validators.required],
            isAdmin: [false],
            address: [''],
            address2: [''],
            city: [''],
            state: [''],
            zip: [''],
            country: ['United States']
        });
    }

    private createUser() {
      this.newUser = new User();
      this.newUser.name =this.userForm['name'].value;
      this.newUser.email= this.userForm['email'].value;
      this.newUser.id= this.userForm['id'].value;
      this.newUser.phone=this.userForm['phone'].value;
      this.newUser.isAdmin=this.userForm['isAdmin'].value;
      this.newUser.shippingAddress1=this.userForm['address'].value;
      this.newUser.shippingAddress2= this.userForm['address2'].value;
      this.newUser.city=this.userForm['city'].value;
      this.newUser.state=this.userForm['state'].value;
      this.newUser.zip= this.userForm['zip'].value;
      this.newUser.country= this.userForm['country'].value;
      this.newUser.password= this.userForm['password'].value;
  }
  private endSubs() {
    this.endSubs$.next();
    // console.log("Users form subs destroyed")
}
}
