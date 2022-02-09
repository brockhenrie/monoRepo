import { MessageService } from 'primeng/api';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UsersService } from '@b-henrie-dev/users';

@Component({
    selector: 'users-list',
    templateUrl: './users-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
    users$: Observable<User[]>;

    selectedUser!: User;

    constructor(
        private us: UsersService,
        private router: Router,
        private ms: MessageService
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    display: boolean = false;
    toggleDialog(user?: User) {
        this.selectedUser = user;
        this.display = !this.display;
    }

    onDeleteUser(id: string) {
        this.us.deleteUser(id).subscribe(
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
        this.users$ = this.us.getUsers() as Observable<User[]>;
    }
}
