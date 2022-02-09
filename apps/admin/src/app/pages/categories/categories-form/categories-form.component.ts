import { Category } from '../../../../../../../libs/products/src/lib/models/category.model';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from '@b-henrie-dev/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesFormComponent implements OnInit {
    editMode = false;
    isSubmitted = false;
    category$ = new Observable<Category>();
    createCat = this.fb.group({
        name: ['', [Validators.required]],
        icon: ['', [Validators.required]],
        id: '',
        color: ''
    });
    color!: string;

    constructor(
        private fb: FormBuilder,
        private cs: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private activeRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._checkEditMode();
    }

    onCreateCategory() {
        this.isSubmitted = true;
        if (this.createCat.invalid) {
            this.isSubmitted = false;
            return;
        }
        const category: Category = {
            name: this.categoryForm['name'].value,
            icon: this.categoryForm['icon'].value,
            color: this.categoryForm['color'].value
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

    onUpdateCategory() {
        if (this.createCat.invalid) return;
        const category: Category = {
            name: this.categoryForm['name'].value,
            icon: this.categoryForm['icon'].value,
            id: this.categoryForm['id'].value,
            color: this.categoryForm['color'].value
        };
        this.cs.updateCategory(category).subscribe((res) => {
            console.log(res);
        });
        this.messageService.add({
            severity: 'success',
            summary: `Success`,
            detail: `Category ${category.name} was created`
        });
        this.createCat.reset();
        this.location.back();
    }

    back() {
        this.location.back();
    }

    get categoryForm() {
        return this.createCat.controls;
    }

    private _checkEditMode() {
        this.activeRoute.params.subscribe((params) => {
            if (params.id) {
                this.editMode = true;
                this.cs.getCategory(params.id).subscribe((cat) => {
                    this.categoryForm['name'].setValue(cat.name),
                        this.categoryForm['icon'].setValue(cat.icon),
                        this.categoryForm['id'].setValue(cat.id),
                        this.categoryForm['color'].setValue(cat.color);
                });
                return;
            }
        });
    }
}
