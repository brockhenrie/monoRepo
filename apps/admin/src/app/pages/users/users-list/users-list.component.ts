import { MessageService } from 'primeng/api';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User, UsersService } from '@b-henrie-dev/users';

@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit, OnDestroy {
    users$!: Observable<User[]>;
    private endSubs$ = new Subject<void>();

    selectedUser!: User;

    constructor(
        private us: UsersService,
        private router: Router,
        private ms: MessageService
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }
    ngOnDestroy(): void {
      this.endSubs();
  }

    display: boolean = false;
    toggleDialog(user?: User) {
        this.selectedUser = user as User;
        this.display = !this.display;
    }

    onDeleteUser(id?: string) {
      if(!id){
        return
      }
        this.us.deleteUser(id as string).pipe(takeUntil(this.endSubs$)).subscribe(
            () => {
                this.ms.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'User was deleted'
                });
            },
            (error) => {
                this.ms.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: "User wasn't deleted"
                });
            }
        );
        this._getUsers();
        this.toggleDialog();
    }

    onEditUser(id: string) {
        this.router.navigateByUrl(`users/form/${id}`);
    }

    private _getUsers() {
        this.users$ = this.us.getUsers();
    }

    private endSubs() {
      this.endSubs$.next();
      // console.log("Users list subs destroyed")
  }
}
