import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent implements OnInit {
  id: number;
  data: any = {};
  loading: boolean = false;
  constructor(
    private activateRouter: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.id = +activateRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getProductID();
  }

  getProductID() {
    this.loading = true;
    this.productsService.getProductByID(this.id).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.data = res;
      },
      error: (err) => {
        this.loading = false;
        console.error(err.message);
      },
    });
  }
}
