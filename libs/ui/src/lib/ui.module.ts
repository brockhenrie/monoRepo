import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { BannerComponent } from './components/banner/banner.component';

import{ButtonModule} from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component'
export const uiRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, RouterModule, ButtonModule],
    declarations: [
      BannerComponent,
      GalleryComponent
    ],
    exports: [
      BannerComponent,
      GalleryComponent,

    ]
})
export class UiModule {}
