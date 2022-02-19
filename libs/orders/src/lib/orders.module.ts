import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Routes } from '@angular/router';
import { CartService } from './services/cart.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';

const ROUTES: Routes = [
  { path: 'cart', component: CartPageComponent },
  {path:'checkout', component: CheckoutPageComponent}
];
@NgModule({
    imports: [
        CommonModule,
        BadgeModule,
        RouterModule.forChild(ROUTES),
        ButtonModule,
        InputNumberModule,
        FormsModule
    ],
    declarations: [CartIconComponent, CartPageComponent, CartSummaryComponent, CheckoutPageComponent],
    exports: [CartIconComponent, RouterModule, CartSummaryComponent, CheckoutPageComponent]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
