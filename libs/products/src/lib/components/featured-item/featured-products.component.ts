/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
})
export class FeaturedProductsComponent implements OnInit {

  featuredProducts$ = this.ps.getFeaturedProducts();
  constructor(private ps: ProductsService) { }

  ngOnInit(): void {
  }

}
