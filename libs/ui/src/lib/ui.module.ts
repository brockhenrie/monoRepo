import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';

import{ButtonModule} from 'primeng/button'
export const uiRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, RouterModule, ButtonModule],
    declarations: [
      BannerComponent
    ],
    exports: [
      BannerComponent,

    ]
})
export class UiModule {}
