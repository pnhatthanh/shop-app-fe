import { Injectable } from '@angular/core';
import { Item } from '../dtos/item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly my_cart='my_cart';

  constructor() {}

  getCart():Item[]{
    const items = localStorage.getItem(this.my_cart);
    return items ? JSON.parse(items):[];
  }

  private saveCart(item:Item[]):void{
    localStorage.setItem(this.my_cart,JSON.stringify(item));
  }

  addToCart(item:Item){
    const curent_cart=this.getCart();
    for(let curent of curent_cart){
      if(curent.idProduct==item.idProduct){
        curent.quantity=item.quantity;
        this.saveCart(curent_cart);
        return;
      }
    }
    curent_cart.push(item);
    this.saveCart(curent_cart);
  }
  
  clearCart(){
    localStorage.removeItem(this.my_cart);
  }
}
