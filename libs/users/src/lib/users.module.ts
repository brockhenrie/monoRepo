import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';

const ROUTES: Routes = [{ path: 'login', component: LoginComponent }];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        InputTextModule,
        ButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MessagesModule,
        MessageModule,
        StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
        EffectsModule.forFeature([UsersEffects])
    ],

    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: [UsersFacade,]
})
export class UsersModule {}
