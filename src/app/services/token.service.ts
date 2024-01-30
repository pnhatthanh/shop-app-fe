import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN='my_token';
  constructor() { }

  getToken():string | null{
    return localStorage.getItem(this.TOKEN);
  }
  setToken(newToken:string):void{
    localStorage.setItem(this.TOKEN,newToken);
  }
  removeToken():void{
    localStorage.removeItem(this.TOKEN);
  }
}
