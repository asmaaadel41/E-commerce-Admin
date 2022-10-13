import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}
  getAllCarts(param?:any){
    let params = new HttpParams();
   params = params.append("startDate", param?.start).append("endDate", param?.end);
  return this.httpClient.get(`${environment.baseApi}carts`, {params})
  }
  deleteProduct(id:number){
    return this.httpClient.delete(`${environment.baseApi}carts/${id}`)
  }
}
