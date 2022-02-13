/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  isLoading= true;
  product$!:Observable<Product>;
    constructor(
    private ps: ProductsService,
    private router: Router,
    private activeRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(){
    console.log('fired')
    this.activeRoute.params.pipe(
    ).subscribe((params:Params) => {
      if (params['id']){
        console.log('fetch')
        this.product$ = this.ps.getProduct(params['id']);
        this.isLoading = false;
      }else{
        console.log('fail')
        this.router.navigateByUrl('/')
      }
    })
  }
}
