import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl="http://localhost:8080/api/v1/categories"
  constructor(private http:HttpClient) {}
  getCategories():Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
