import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Output() data;
  addButton: boolean = false;
  amount: number = 0;
  constructor() {
    this.data = new EventEmitter();
  }

  ngOnInit(): void {}
  add() {
    this.data.emit({ product: this.product, quantity: this.amount });
  }
}
