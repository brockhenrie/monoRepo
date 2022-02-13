/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, Input} from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;
  constructor() { }

  ngOnInit(): void {
  }

  addToCart(id?:string){
    if(!id){
      alert('invalid');
      return
    }
    console.log(id);

  }

}
