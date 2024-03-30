import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orderDto } from '../dtos/order';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Order } from '../responses/Order';
import { DetailOrder } from '../responses/DetailOrder';

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

  getOrderForUser(idUser:number):Observable<Order[]>{
    const token=this.tokenService.getToken();
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.get<Order[]>(`http://localhost:8080/api/v1/order/user/${idUser}`,{headers});
  }

  getDetailOrder(idOrder:number):Observable<DetailOrder[]>{
    const token=this.tokenService.getToken();
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.get<DetailOrder[]>(`http://localhost:8080/api/v1/detail_order/order/${idOrder}`,{headers});
  }

  deleteOrder(idOrder:number):Observable<any>{
    const token=this.tokenService.getToken();
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.delete<any>(`http://localhost:8080/api/v1/order/${idOrder}`,{headers});
  }
}
