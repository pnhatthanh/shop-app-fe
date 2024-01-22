import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../responses/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private  apiUrl='http://localhost:8080/api/v1/role';
  constructor(private http:HttpClient) { }
  getRoles():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
