import { StripeService } from 'ngx-stripe';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
    AuthGuard,
    AuthService,
    JwtInterceptor,
    LocalstorageService,
    UsersModule,
    UsersService
} from '@b-henrie-dev/users';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { OrdersModule, OrdersService } from '@b-henrie-dev/orders';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@b-henrie-dev/ui';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { CategoriesService, ProductsModule } from '@b-henrie-dev/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MessgaesComponent } from './shared/messgaes/messgaes.component';

import{ NgxStripeModule} from 'ngx-stripe';

const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent }
];
@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        HeaderComponent,
        FooterComponent,
        NavComponent,
        MessgaesComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES),
        BrowserAnimationsModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        NgxStripeModule.forRoot('pk_test_51KVk8kKj3kdwtQkGoj4KEzbithtV1qrho7SAf9s3JYOTzV3MTN0capJygiAGPJ6yVuyYm4l0gO7mfLP1rTlNe7C100amxwQKg8'),
        UiModule,
        AccordionModule,
        ProductsModule,
        OrdersModule,
        ToastModule,
        UsersModule
    ],
    providers: [
      {provide:HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi: true},
        CategoriesService,
        MessageService,
        AuthGuard,
        LocalstorageService,
        AuthService,
        UsersService,
        StripeService,
        OrdersService
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {}
