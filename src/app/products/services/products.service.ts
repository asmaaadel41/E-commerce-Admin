import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<string> {
    return this.http.get<string>(`${environment.baseApi}products`);
  }
  getAllCategories(): Observable<string> {
    return this.http.get<string>(`${environment.baseApi}products/categories`);
  }
  getProductByCat(category: string): Observable<string> {
    return this.http.get<string>(
      `${environment.baseApi}products/category/${category}`
    );
  }
  getProductByID(id: number): Observable<number> {
    return this.http.get<number>(`${environment.baseApi}products/${id}`);
  }
  addProduct(model: any){
    return this.http.post(`${environment.baseApi}products`, model)
  }
  updateProduct(id:number, model:any){
    return this.http.patch(`${environment.baseApi}products/${id}`, model)
  }
}
