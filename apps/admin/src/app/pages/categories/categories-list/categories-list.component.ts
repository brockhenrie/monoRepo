import { MessageService } from 'primeng/api';
import { Category } from '../../../../../../../libs/products/src/lib/models/category.model';
import { CategoriesService } from '../../../../../../../libs/products/src/lib/services/categories.service';
import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    categories$!: Observable<Category[]>;
    private endSubs$ = new Subject<void>();

    selectedCategory!: Category;

    constructor(
        private cs: CategoriesService,
        private router: Router,
        private ms: MessageService
    ) {}
    ngOnDestroy(): void {
        this.endSubs();
    }

    ngOnInit(): void {
        this._getCategories();
    }

    display: boolean = false;
    toggleDialog(category?: Category) {
        this.selectedCategory = category as Category;
        this.display = !this.display;
    }

    onDeleteCategory(id?: string) {
        this.cs
            .deleteCategory(id as string)
            .pipe(takeUntil(this.endSubs$))
            .subscribe(
                () => {
                    this.ms.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Category was deleted'
                    });
                },
                (error) => {
                    this.ms.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Category was deleted'
                    });
                }
            );
        this._getCategories();
        this.toggleDialog();
    }

    onEditCategory(id: string) {
        this.router.navigateByUrl(`categories/form/${id}`);
    }

    private _getCategories() {
        this.categories$ = this.cs.getCategories();
    }
    private endSubs() {
        this.endSubs$.next();
        // console.log('Categories list subs destroyed');
    }
}
