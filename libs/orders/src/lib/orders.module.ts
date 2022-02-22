import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AuthGuard } from '@b-henrie-dev/users';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';


const ROUTES: Routes = [
  { path: 'cart', component: CartPageComponent },
  {path:'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard]},
  {path:'success', component: ThankyouComponent, canActivate: [AuthGuard]}
];
@NgModule({
    imports: [
        CommonModule,
        BadgeModule,
        RouterModule.forChild(ROUTES),
        ButtonModule,
        InputNumberModule,
        FormsModule,
        InputTextModule,
        InputMaskModule,
        DropdownModule,
        ReactiveFormsModule
    ],
    declarations: [CartIconComponent, CartPageComponent, CartSummaryComponent, CheckoutPageComponent, ThankyouComponent],
    exports: [CartIconComponent, RouterModule, CartSummaryComponent, CheckoutPageComponent, ThankyouComponent]
})
export class OrdersModule {
    constructor(cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
