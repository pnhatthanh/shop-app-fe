import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../responses/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Item } from '../../dtos/item';
import { CommonModule } from '@angular/common';
import { UserDetails } from '../../responses/UserDetails';
import { UserService } from '../../services/user.service';
import { orderDto } from '../../dtos/order';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,FormsModule ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  products:Product[]=[];
  items:Item[]=[];
  totalPrice:number=0;
  user?:UserDetails|null;
  orderDto:orderDto={
    'userId':0,
    'fullName':'',
    'email':'',
    'address':'',
    'items':[],
    'note':'',
    'paymentMethod':'',
    'shippingMethod':'Standard express',
    'shippingAddress':'',
    'shippingDate':new Date(),
    'totalMoney':0,
    'phoneNumber':''
  };
  constructor(private route:ActivatedRoute,
    private rotert:Router,
    private productService:ProductService,
    private router:Router,
    private userService:UserService,
    private orderService:OrderService){}
  ngOnInit(): void {
    this.user=this.userService.getUserDetailsFromLocalStorage();
    if(this.user==null){
      this.router.navigate(['/login']);
    }else{
      this.orderDto.userId=this.user.id;
      this.orderDto.fullName=this.user.fullName;
      this.orderDto.phoneNumber=this.user.phoneNumber;
      this.orderDto.address=this.user.address;  
    }
    this.route.queryParams.subscribe(params => {
      if (params['items']) {
        this.items = JSON.parse(params['items']);
      }
    });
    for (let item of this.items) {
      this.productService.getProductById(item.idProduct).subscribe({
        next: (product: Product) => {
          product.url_img = `http://localhost:8080/api/v1/products/thumbnail/${product.thumbnail}`;
          product.quantity = item.quantity;
          this.products.push(product);
          this.totalPrice+=product.price*product.quantity;
        },
        error: (error: any) => {
          alert(`Error ${error.error}`);
        },
        complete: () => { }
      });
    }
  }
  order(){
    this.orderDto.items=this.items;
    this.orderDto.shippingDate.setDate(this.orderDto.shippingDate.getDate()+3);
    this.orderDto.shippingAddress=this.orderDto.address;
    this.orderDto.totalMoney=this.totalPrice;
    this.orderService.createOrder(this.orderDto).subscribe({
      next:(responses:any)=>{
        this.router.navigate(['/success-order']);
      },
      error:()=>{alert("ERROR")},
      complete:()=>{}
    })
  }
}
