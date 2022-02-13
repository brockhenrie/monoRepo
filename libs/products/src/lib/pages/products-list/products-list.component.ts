/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';
@Component({
    selector: 'products-products-list',
    templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit , OnDestroy{
    products$ = new Observable<Product[]>();
    categories$= this.cs.getCategories();
    unSub$ = new Subject<void>();

    selectedCats:string[] = []
   isCategoriesPage = false;
    constructor(
      private ps: ProductsService,
       private cs: CategoriesService,
       private activeRoute:ActivatedRoute,
       ) {}

    ngOnInit(): void {
      this.checkForCatFilter();
    }
    ngOnDestroy(): void {
      this.unSub$.next();
    }

    selectedCategories(categoryIds:string[]): void {
      this.products$ = this.ps.getProducts(categoryIds);
    }

    private checkForCatFilter(){
      this.activeRoute.params.pipe(
        takeUntil(this.unSub$)
      ).subscribe((params:Params) => {
        if (params['categoryId']){
          this.isCategoriesPage = true;
          this.products$ = this.ps.getProducts([params['categoryId']]);
        }else{
          this.isCategoriesPage = false;
          this.products$ = this.ps.getProducts();
        }
      })
    }
}
