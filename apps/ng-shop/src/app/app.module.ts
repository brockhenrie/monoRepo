import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  RouterModule, Routes } from '@angular/router';
import { UiModule } from '@b-henrie-dev/ui';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import {AccordionModule} from 'primeng/accordion';



const ROUTES: Routes= [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomePageComponent},
  {path:'products', component: ProductListComponent}
]
@NgModule({
  declarations: [AppComponent, HomePageComponent, ProductListComponent, HeaderComponent, FooterComponent,],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    UiModule,
    AccordionModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
