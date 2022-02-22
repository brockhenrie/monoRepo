import { AppRoutingModule } from './app-routing.module';
import { LocalstorageService } from '@b-henrie-dev/users';
import { OrdersService } from '@b-henrie-dev/orders';
import { ProductsService, CategoriesService } from '@b-henrie-dev/products';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { UiModule } from '@b-henrie-dev/ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersModule, UsersService, AuthService } from '@b-henrie-dev/users';
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
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxStripeModule } from 'ngx-stripe';

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
        AppRoutingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgxStripeModule.forRoot(
            'pk_test_51KVk8kKj3kdwtQkGoj4KZenithV1Argo7SAf9s3JYOTzV3MTN0capJigAGPJ6yVuyYm4l0gO7mfLP1rTlNe7C100maxiQKg8'
        ),
        UiModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ...UX_MODULE,
        UsersModule
    ],
    providers: [
        CategoriesService,
        MessageService,
        ProductsService,
        UsersService,
        OrdersService,
        AuthService,
        LocalstorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
