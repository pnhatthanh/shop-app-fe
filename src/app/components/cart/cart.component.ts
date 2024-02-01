import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../responses/Product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule,RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  constructor(private cartService: CartService,
    private productService: ProductService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const items = this.cartService.getCart();
    for (let item of items) {
      this.productService.getProductById(item.idProduct).subscribe({
        next: (product: Product) => {
          product.url_img = `http://localhost:8080/api/v1/products/thumbnail/${product.thumbnail}`;
          product.quantity = item.quantity;
          this.products.push(product);
        },
        error: (error: any) => {
          alert(`Error ${error.error}`);
        },
        complete: () => { }
      });
    }
  }

  deleteProduct(id: number) {
    this.cartService.deleteItem(id);
    this.products.splice(0, this.products.length);
    this.getProduct();
  }

  toPay(){
    this.router.navigate(["/order"])
  }
}
