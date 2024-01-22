import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { RegisterDto } from '../dtos/user/register.dto';
import { Observable } from 'rxjs';
import { LoginDto } from '../dtos/user/login.dto';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlRegister='http://localhost:8080/api/v1/user/register';
  private apiUrlLogin='http://localhost:8080/api/v1/user/login';

  constructor(private http: HttpClient) {
  }
  register(registerDto:RegisterDto):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.apiUrlRegister,registerDto,{headers:headers});
  }

  login(loginDto:LoginDto):Observable<any>{
    const headers=new HttpHeaders({'Content-type':'application/json'});
    return this.http.post(this.apiUrlLogin,loginDto,{headers});
  }
}
