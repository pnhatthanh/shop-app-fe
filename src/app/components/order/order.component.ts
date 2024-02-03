import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../responses/Product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Item } from '../../dtos/item';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{
  products:Product[]=[];
  items:Item[]=[];
  totalPrice:number=0;
  constructor(private route:ActivatedRoute,
    private productService:ProductService){}
  ngOnInit(): void {
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
          this.totalPrice+=product.price;
        },
        error: (error: any) => {
          alert(`Error ${error.error}`);
        },
        complete: () => { }
      });
    }
  }
}
