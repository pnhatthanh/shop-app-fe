import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { DetailProduct } from '../responses/DetailProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) {}
  getProducts(page:number,limit:number):Observable<any[]>{
    const params = {
      page: page.toString(),
      limit: limit.toString()
    };
    return this.http.get<any[]>(`http://localhost:8080/api/v1/products`,{params:params});
  }
  getDetailproduct(id:number):Observable<DetailProduct>{
    return this.http.get<DetailProduct>(`http://localhost:8080/api/v1/products/${id}`);
  }
}
