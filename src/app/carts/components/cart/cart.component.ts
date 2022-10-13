import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';
// import { Cart } from '../../models/cart';
import { CartService } from '../../services/cart.service';
// import { Product } from './../../../products/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  carts: any[] = [];
  products: any[] = [];
  total: number = 0;
  details: any;
  form!: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      start: [''],
      end: [''],
    });
    this.getAllCarts();
  }
  getAllCarts() {
    this.cartService.getAllCarts().subscribe((res: any) => {
      this.carts = res;
    });
  }
  applyFilter() {
    let date = this.form.value;
    this.cartService.getAllCarts(date).subscribe((res: any) => {
      this.carts = res;
    });
  }
  deleteProduct(id: number) {
    this.cartService.deleteProduct(id).subscribe((res) => {
      this.getAllCarts();
      alert('cart deleted success');
    });
  }

  view(index: number) {
    this.products = [];
    this.details = this.carts[index];
    for(let x in this.details.products){
      this.productService
        .getProductByID(this.details.products[x].productId)
        .subscribe((res) =>
          this.products.push({
            item: res,
            quantity: this.details.products[x].quantity,
          })
        );
    }    
 }
}