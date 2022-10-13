import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from './components/product/product.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';


@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailsComponent,
    ProductComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule
  ]
})
export class ProductsModule { }
