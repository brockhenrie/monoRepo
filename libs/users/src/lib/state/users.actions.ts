import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';




export const buildUserSession = createAction('[Users] Build User Session');


export const buildUserSessionSuccess = createAction(
    '[Users] Build Users Session Success',
    props<{ user: User }>()
);

export const buildUsersSessionFailed = createAction(
    '[Users] Build Users Session Failed',
    
);
