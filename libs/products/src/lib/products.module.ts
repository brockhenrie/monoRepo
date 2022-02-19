
import { MessageModule } from 'primeng/message';
import { UiModule } from '@b-henrie-dev/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-item/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';

import { ProductPageComponent } from './pages/product-page/product-page.component';

const ROUTES: Routes = [
  {path:'products', component: ProductsListComponent},
  {path:'products/:categoryId', component: ProductsListComponent},
  {path:'product/:id', component: ProductPageComponent}
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        FormsModule,
        RouterModule.forChild(ROUTES),
        CheckboxModule,
        ProgressSpinnerModule,
        BrowserAnimationsModule,
        RatingModule,
        InputNumberModule,
        UiModule,
        MessageModule
    ],

    declarations: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductsListComponent,
        CategoriesListComponent,
        ProductPageComponent
    ],
    exports: [
        ProductsSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductsListComponent,
        CategoriesListComponent,
        ProductPageComponent
    ],

})
export class ProductsModule {}
