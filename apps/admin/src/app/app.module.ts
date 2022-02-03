import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { CategoriesService } from './../../../../libs/products/src/lib/services/categories.service';
import { UiModule } from '@b-henrie-dev/ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';


import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';


const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  MessageModule,
  MessagesModule,
  ToastModule,
  DialogModule
]

const ROUTES:Routes = [
  {path: '',component: ShellComponent, children:[
    {path:'dashboard', component: DashboardComponent},
    {path:'categories', component: CategoriesListComponent},
    {path:'categories/form', component:CategoriesFormComponent},

  ]
}
]

@NgModule({
    declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(ROUTES, { initialNavigation: 'enabledBlocking' }),
        UiModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ...UX_MODULE,

    ],
    providers: [
      CategoriesService,
      MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
