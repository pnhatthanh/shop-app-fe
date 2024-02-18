import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderDto } from '../dtos/order';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url_order="http://localhost:8080/api/v1/order/create";
  constructor(private http:HttpClient,
    private tokenService:TokenService) { }
  createOrder(order:orderDto):Observable<any>{
    const token=this.tokenService.getToken();
    const headers=new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.url_order,order,{headers});
  }
}
