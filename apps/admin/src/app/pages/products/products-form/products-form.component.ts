import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    CategoriesService,
    Category,
    ProductsService
} from '@b-henrie-dev/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsFormComponent implements OnInit, OnDestroy{
    formData = new FormData();
    editMode = false;
    categories$ = new Observable<Category[]>();
    productF!: FormGroup;
    imageDisplay!: string | ArrayBuffer;
    private endSubs$ = new Subject<void>();

    constructor(
        private fb: FormBuilder,
        private ps: ProductsService,
        private cs: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private activeRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._checkEditMode();
        this.categories$ = this.cs.getCategories();
    }

    ngOnDestroy(): void {
      this.endSubs();
  }

    onCreateProduct() {
        if (this.productF.invalid) return;
        this.appendForm();
        this.ps.createProduct(this.formData).pipe(takeUntil(this.endSubs$)).subscribe(
            (res) => {
                console.log(res);
                this.location.back();
            },
            (err) => {
              console.log(err);
            }
        );
        this.messageService.add({
            severity: 'success',
            summary: `Success`,
            detail: `Product ${this.formData.get('name')} was created`
        });
        this.productF.reset();
    }

    onUpdateProduct() {
        if (this.productF.invalid) return;
        this.appendForm();
        this.ps.updateProduct(this.formData).pipe(takeUntil(this.endSubs$)).subscribe(
            (res) => {
                console.log(res);
                this.location.back();
            },
            (err) => {
              console.log(err)
            }
        );
        this.messageService.add({
            severity: 'success',
            summary: `Success`,
            detail: `Product ${this.formData.get('name')} was created`
        });
        this.productF.reset();
    }

    back() {
        this.location.back();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onImageUpload(event:any) {
        const file = event.target.files[0];
        if (file) {
            this.productF.patchValue({ image: file });
            this.productForm['image'].updateValueAndValidity();
            const fileReader = new FileReader();

            fileReader.onload = () => {
                this.imageDisplay = fileReader.result as string | ArrayBuffer;
            };
            fileReader.readAsDataURL(file);
        }
    }

    get productForm() {
        return this.productF.controls;
    }

    private _checkEditMode() {
        this.activeRoute.params.pipe(takeUntil(this.endSubs$)).subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.ps.getProduct(params['id']).pipe(takeUntil(this.endSubs$)).subscribe((product) => {
                    this.productForm['name'].setValue(product.name),
                        this.productForm['brand'].setValue(product.brand),
                        this.productForm['price'].setValue(product.price),
                        this.productForm['category'].setValue(product.category),
                        this.productForm['countInStock'].setValue(
                            product.countInStock
                        ),
                        this.productForm['description'].setValue(
                            product.description
                        ),
                        this.productForm['richDescription'].setValue(
                            product.richDescription
                        ),
                        this.productForm['image'].setValue(product.image),
                        (this.imageDisplay = product.image as string| ArrayBuffer);
                    this.productForm['isFeatured'].setValue(product.isFeatured),
                        this.productForm['id'].setValue(product.id);
                });
                return;
            }
        });
    }

    private _initForm() {
        this.productF = this.fb.group({
            name: ['', [Validators.required]],
            brand: ['', [Validators.required]],
            price: ['', [Validators.required]],
            category: ['', [Validators.required]],
            countInStock: ['', [Validators.required]],
            description: ['', [Validators.required]],
            richDescription: [''],
            id: [''],
            image: [''],
            isFeatured: [false]
        });
    }

    private appendForm() {
        this.formData.append('name', this.productForm['name'].value);
        this.formData.append('brand', this.productForm['brand'].value);
        this.formData.append('price', this.productForm['price'].value);
        this.formData.append('category', this.productForm['category'].value);
        this.formData.append(
            'countInStock',
            this.productForm['countInStock'].value
        );
        this.formData.append(
            'description',
            this.productForm['description'].value
        );
        this.formData.append(
            'richDescription',
            this.productForm['richDescription'].value
        );
        this.formData.append('image', this.productForm['image'].value);
        this.formData.append(
            'isFeatured',
            this.productForm['isFeatured'].value
        );
        this.formData.append('id', this.productForm['id'].value);
    }

    private endSubs() {
      this.endSubs$.next();
      // console.log('Products form subs destroyed');
  }
}
