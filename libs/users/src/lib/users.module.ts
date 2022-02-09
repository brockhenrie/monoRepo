import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

const ROUTES: Routes = [
  {path:'login', component: LoginComponent}
]
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

    ],

    declarations: [
      LoginComponent,

    ],
    exports:[
      LoginComponent,
    ]
})
export class UsersModule {}
