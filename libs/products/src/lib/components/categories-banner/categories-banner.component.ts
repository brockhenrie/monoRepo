/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service'

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
})
export class CategoriesBannerComponent implements OnInit {

  categories$ = this.cs.getCategories();
  constructor(
    private cs: CategoriesService,
  ) { }

  ngOnInit(): void {

  }

}
