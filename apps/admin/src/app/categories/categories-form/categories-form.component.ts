import { Category } from './../../../../../../libs/products/src/lib/models/category.model';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '@b-henrie-dev/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'b-henrie-dev-categories-form',
    templateUrl: './categories-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesFormComponent implements OnInit {
    isSubmitted = false;
    editMode = this._checkEditMode();
    createCat = this.fb.group({
        name: ['', [Validators.required]],
        icon: ['', [Validators.required]],
        id: ''
    });

    constructor(
        private fb: FormBuilder,
        private cs: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private activeRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {}

    onCreateCategory() {
        this.isSubmitted = true;
        if (this.createCat.invalid) {
            this.isSubmitted = false;
            return;
        }
        const category: Category = {
            name: this.categoryForm['name'].value,
            icon: this.categoryForm['icon'].value
        };
        this.cs.createCategory(category).subscribe((res) => {
            console.log(res);
        });
        this.messageService.add({
            severity: 'success',
            summary: `Success`,
            detail: `Category ${category.name} was created`
        });
        this.createCat.reset();
        this.isSubmitted = false;
        this.location.back();
    }

    onUpdateCategory(){
      this.isSubmitted = true;
      if (this.createCat.invalid) {
          this.isSubmitted = false;
          return;
      }
      const category: Category = {
          name: this.categoryForm['name'].value,
          icon: this.categoryForm['icon'].value
      };
      this.cs.createCategory(category).subscribe((res) => {
          console.log(res);
      });
      this.messageService.add({
          severity: 'success',
          summary: `Success`,
          detail: `Category ${category.name} was created`
      });
      this.createCat.reset();
      this.isSubmitted = false;
      this.location.back();
    }

    back(){
      this.location.back();
    }

    get categoryForm() {
        return this.createCat.controls;
    }

    private _checkEditMode() {
      let editMode;
        this.activeRoute.params.subscribe((params) => {
          if(params.id){
           editMode= true;
           this.cs.getCategories(params.id).subscribe(cat  => {
              this.createCat.value.name = (cat as Category).name
              this.createCat.value.icon = (cat as Category).icon,
              this.createCat.value.id = (cat as Category).id
           })as Category;
          }
        });
        return editMode;
    }
}
