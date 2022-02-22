import { MessageService } from 'primeng/api';
import { Category,CategoriesService } from '@b-henrie-dev/products';
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
    display = false;

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
                        detail: `${JSON.stringify(error)}`
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
