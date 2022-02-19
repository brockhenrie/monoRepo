import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { OrdersModule } from '@b-henrie-dev/orders';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  RouterModule, Routes } from '@angular/router';
import { UiModule } from '@b-henrie-dev/ui';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import {CategoriesService, ProductsModule} from '@b-henrie-dev/products'
import { HttpClientModule } from '@angular/common/http';
import { MessgaesComponent } from './shared/messgaes/messgaes.component';


const ROUTES: Routes= [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomePageComponent},
]
@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessgaesComponent,],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    UiModule,
    AccordionModule,
    ProductsModule,
    OrdersModule,
    ToastModule

  ],
  providers: [CategoriesService, MessageService],
  bootstrap: [AppComponent],
  exports: [

  ],
})
export class AppModule {}
