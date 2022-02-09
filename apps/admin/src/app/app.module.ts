import { JwtInterceptor } from '@b-henrie-dev/users';
import { LocalstorageService } from './../../../../libs/users/src/lib/services/localstorage.service';
import { OrdersService } from './../../../../libs/orders/src/lib/services/orders.service';
import { ProductsService } from './../../../../libs/products/src/lib/services/products.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { CategoriesService } from './../../../../libs/products/src/lib/services/categories.service';
import { UiModule } from '@b-henrie-dev/ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { AuthGuard, IsAdminGuard, UsersModule, UsersService,AuthService } from '@b-henrie-dev/users';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailsComponent } from './pages/orders/orders-details/orders-details.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import {FieldsetModule} from 'primeng/fieldset';

const UX_MODULE = [
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    DialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    InputSwitchModule,
    EditorModule,
    TagModule,
    InputMaskModule,
    FieldsetModule
];

const ROUTES: Routes = [
    {
        path: '',
        component: ShellComponent,
        canActivate:[AuthGuard],
        children: [
            {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
            { path: 'dashboard', component: DashboardComponent },
            { path: 'categories', component: CategoriesListComponent },
            { path: 'categories/form', component: CategoriesFormComponent },
            { path: 'categories/form/:id', component: CategoriesFormComponent },
            { path: 'products', component: ProductsListComponent },
            { path: 'products/form', component: ProductsFormComponent },
            { path: 'products/form/:id', component: ProductsFormComponent },
            { path: 'users', component: UsersListComponent },
            { path: 'users/form', component: UsersFormComponent },
            { path: 'users/form/:id', component: UsersFormComponent },
            { path: 'orders', component: OrdersListComponent },
            { path: 'orders/details/:id', component: OrdersDetailsComponent }
        ]
    }
];

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ShellComponent,
        SidebarComponent,
        CategoriesListComponent,
        CategoriesFormComponent,
        ProductsListComponent,
        ProductsFormComponent,
        UsersFormComponent,
        UsersListComponent,
        OrdersDetailsComponent,
        OrdersListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(ROUTES, { initialNavigation: 'enabledBlocking' }),
        UiModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ...UX_MODULE,
        UsersModule
    ],
    providers: [
       {provide:HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi: true},
        CategoriesService,
        MessageService,
        ProductsService,
        UsersService,
        OrdersService,
        AuthService,
        AuthGuard,
        IsAdminGuard,
        LocalstorageService,


    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
