import { LocalstorageService } from '@b-henrie-dev/users';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { concatMap, map, of, catchError } from 'rxjs';

import * as UsersActions from './users.actions';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
    buildUserSession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.buildUserSession),
            concatMap(() => {
                if (this.ls.isValidToken()) {
                    const userId = this.ls.getUserIdFromToken();
                    if (userId) {
                        return this.us.getUser(userId).pipe(
                            map((user) => {
                                return UsersActions.buildUserSessionSuccess({
                                    user: user
                                });
                            }),
                            catchError(() => {
                                return of(
                                    UsersActions.buildUsersSessionFailed()
                                );
                            })
                        );
                    } else {
                        return of(UsersActions.buildUsersSessionFailed());
                    }
                } else {
                    return of(UsersActions.buildUsersSessionFailed());
                }
            })
        )
    );

    constructor(
        private readonly actions$: Actions,
        private ls: LocalstorageService,
        private us: UsersService
    ) {}
}
