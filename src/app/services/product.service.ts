import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiProductUrl="http://localhost:8080/api/v1/products?page=0&limit=12";
  private apiImgUrl="http://localhost:8080/api/v1/products/thumbnail/02052588-fe14-4b5c-8ac8-70271eb46a9b_2.jpg"
  constructor(private http:HttpClient) {}
  getProducts():Observable<any[]>{
    return this.http.get<any[]>(this.apiProductUrl);
  }
}
