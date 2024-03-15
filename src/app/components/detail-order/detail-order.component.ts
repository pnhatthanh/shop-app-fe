import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../responses/Order';
import { DetailOrder } from '../../responses/DetailOrder';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-order',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './detail-order.component.html',
  styleUrl: './detail-order.component.scss'
})
export class DetailOrderComponent implements OnInit{

  order?:Order;
  details:DetailOrder[]=[];

  constructor(private route:ActivatedRoute,
      private orderService:OrderService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['order']) {
        this.order = JSON.parse(params['order']);
      }
    });
    this.loadOrder();
  }

  loadOrder(){
    if(this.order!==undefined){
      this.orderService.getDetailOrder(this.order.id).subscribe({
        next:(response:any)=>{
          this.details=response;
          this.details.forEach(detail=>{
            detail.product.url_img=`http://localhost:8080/api/v1/products/thumbnail/${detail.product.thumbnail}`;
          })
        },
        error: (error: any) => {
          alert(`Error ${error.error}`);
        },
        complete: () => { }
      })
    }
  }
}
