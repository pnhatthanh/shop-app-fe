import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { RegisterDto } from '../dtos/user/register.dto';
import { Observable } from 'rxjs';
import { LoginDto } from '../dtos/user/login.dto';
import { UserDetails } from '../responses/UserDetails';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlRegister='http://localhost:8080/api/v1/user/register';
  private apiUrlLogin='http://localhost:8080/api/v1/user/login';
  private apiUserDetails='http://localhost:8080/api/v1/user/details';

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

  saveUsertoLocalStorage(userDetails:UserDetails){
    try{
      if(userDetails==null){
        return;
      }
      const user=JSON.stringify(userDetails);
      localStorage.setItem("user",user);
    }catch(error){
      console.error('Error saving user response to local storage:', error);
    }
  }

  getUserDetail(token: string):Observable<any> {
    return this.http.get<any>(this.apiUserDetails, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    })
  }

  getUserDetailsFromLocalStorage():UserDetails|null{
    const user=localStorage.getItem("user");
    if(user==null){
      return null;
    }
    const userDetails=JSON.parse(user);
    return userDetails;
  }
}
