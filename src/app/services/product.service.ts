import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { DetailProduct } from '../responses/DetailProduct';
import { ProductImg } from '../responses/ProductImage';
import { Product } from '../responses/Product';

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
    return this.http.get<DetailProduct>(`http://localhost:8080/api/v1/products/description/${id}`);
  }
  getAllImg(id:number):Observable<ProductImg[]>{
    return this.http.get<ProductImg[]>(`http://localhost:8080/api/v1/products/image/${id}`);
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`http://localhost:8080/api/v1/products/${id}`);
  }

  searchProducts(page: number, limit: number, idCategory: number, keyword: string): Observable<any[]> {
    const params = {
      page: page.toString(),
      limit: limit.toString(),
      category: idCategory.toString(),
      nameProduct: keyword.toString()
    };
    return this.http.get<any[]>('http://localhost:8080/api/v1/products/search', { params: params });
  }
  
}
