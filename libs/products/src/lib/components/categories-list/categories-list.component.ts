/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'products-categories-list',
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit {

  @Input() categories!: Category[];
  @Output() selectedCategory = new EventEmitter<string[]>();
  selectedCategories! : string[];
  constructor() { }

  ngOnInit(): void {
  }

  onFilter(){
    this.selectedCategory.emit(this.selectedCategories);
  }
  categoryFilter(){
    const selectedCats = this.categories.filter(category=> {
      if (category.checked !== null){
        return category.checked
      }else{
        return false
      }
    }).map(category=> category.id);
    this.selectedCategories = selectedCats as string[]
  }

}
