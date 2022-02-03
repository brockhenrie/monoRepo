import { Category } from './../../../../../../libs/products/src/lib/models/category.model';
import { CategoriesService } from './../../../../../../libs/products/src/lib/services/categories.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent implements OnInit {
    categories$ = this.cs.categories$;
    selectedCategory!:Category;

    constructor(private cs: CategoriesService, private router: Router) {}

    ngOnInit(): void {
        // this._getCategories()
    }

    display: boolean = false;
    toggleDialog(category?: Category) {
      this.selectedCategory = category as Category;
        this.display = !this.display;
    }

    onDeleteCategory(id: string) {
        this.cs.deleteCategory(id).subscribe((res) => {});
    }


    onEditCategory(id: string) {}



    // _getCategories(){
    //   this.cs.getCategories().subscribe(categories=>{
    //     this.categories = categories
    //   })
    // }
}
