import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Order } from '../../responses/Order';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './my-order.component.html',
  styleUrl: './my-order.component.scss'
})
export class MyOrderComponent implements OnInit{
  orders:Order[]=[];
  constructor(private orderSerivce:OrderService,
    private router:Router,
    private userService:UserService,
    ){}
  ngOnInit(): void {
    this.loadOrderForUSer();
  }

  loadOrderForUSer(){
    const idUser=this.userService.getUserDetailsFromLocalStorage()?.id;
    if(idUser==undefined){
      this.router.navigate(['/login']);
    }else{
      this.orderSerivce.getOrderForUser(idUser).subscribe({
        next:(response:any)=>{
          this.orders=response;
        },
        error:(error:any)=>{
          alert("Cannot load order for user:"+error.error.message);
        },
        complete:()=>{}
      }) 
    }
  }

  toDetailOrder(order:Order){
    this.router.navigate(['/detail-order'], { queryParams: { order: JSON.stringify(order) } })
  }
    
}
