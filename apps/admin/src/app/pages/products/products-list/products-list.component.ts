import { Product } from './../../../../../../../libs/products/src/lib/models/product.model';
import { MessageService } from 'primeng/api';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'libs/products/src/lib/services/products.service';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit, OnDestroy {
    products$!: Observable<Product[]>;

    selectedProduct!: Product;
    private endSubs$ = new Subject<void>();

    constructor(
        private ps: ProductsService,
        private router: Router,
        private ms: MessageService
    ) {}

    ngOnInit(): void {
        this._getProducts();
    }

    ngOnDestroy(): void {
      this.endSubs();
  }

    display: boolean = false;
    toggleDialog(product?: Product) {
        this.selectedProduct = product as Product;
        this.display = !this.display;
    }

    onDeleteProduct(id?: string) {
        this.ps.deleteProduct(id as string).pipe(takeUntil(this.endSubs$)).subscribe(
            () => {
                this.ms.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Product was deleted'
                });
            },
            (error) => {
                this.ms.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: "Product wasn't deleted"
                });
            }
        );
        this._getProducts();
        this.toggleDialog();
    }

    onEditProduct(id?: string) {
        this.router.navigateByUrl(`products/form/${id as string}`);
    }

    private _getProducts() {
        this.products$ = this.ps.getProducts();
    }
    private endSubs() {
      this.endSubs$.next();
      // console.log('Products list subs destroyed');
  }
  }
