import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  base64: any;
  form!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private productsService: ProductsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true;
    this.productsService.getAllProducts().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.products = res;
      },
      error: (err) => {
        this.loading = false;
        console.log(err.message);
      },
    });
  }
  getCategories() {
    this.loading = true;
    this.productsService.getAllCategories().subscribe({
      next: (res: any) => {
        this.loading = false;
        this.categories = res;
      },
      error: (err) => {
        this.loading = false;
        console.log(err.message);
      },
    });
  }

  getSelectedCategory(event: any) {
    this.form.get('category')?.setValue(event.target.value);
  }
  getImagePath(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.form.get('image')?.setValue('Image');
    };
  }
  addProduct() {
    const model = this.form.value;
    this.productsService.addProduct(model).subscribe((res) => {
      //  alert("added");
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    });
  }
  updateProduct(product: any, index:number) {
    // const model = this.form.value;
   const model = this.form.patchValue({
      title: product.title,
      description: product.description, 
      price: product.price,
      image: product.image,
      category: product.category
    })
    this.base64 = product.image;
    this.productsService.updateProduct(index, model).subscribe((res)=>{
      
      console.log(this.form.value);
    })
  }
}
