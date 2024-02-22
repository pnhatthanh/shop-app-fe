import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailProduct } from '../../responses/DetailProduct';
import { FormsModule } from '@angular/forms';
import { ProductImg } from '../../responses/ProductImage';
import { CommonModule } from '@angular/common';
import { Item } from '../../dtos/item';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  private productId: number = 0;
  detailProduct?: DetailProduct;
  quantity: number = 1;
  index: number = 0;
  arrImg: string[] = [];
  constructor(private productService: ProductService,
    private router: ActivatedRoute,
    private cartService:CartService,
    private route:Router) { }
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const id = params['id'];
      this.productId = +id;
    });
    this.productService.getDetailproduct(this.productId).subscribe({
      next: (product: DetailProduct) => {
        this.detailProduct = product;
      },
      error: (error: any) => {
        alert(`Error ${error.error}`);
      },
      complete: () => { }
    });
    this.productService.getAllImg(this.productId).subscribe({
      next: (productImg: ProductImg[]) => {
        for (let img of productImg) {
          img.url_img = `http://localhost:8080/api/v1/products/thumbnail/${img.image}`;
          this.arrImg.push(img.url_img);
        }
      },
      error: (error: any) => {
        alert(`Error ${error.error}`);
      },
      complete: () => { }
    });
  }
  decreaseIndex() {
    if (this.index == 0) {
      this.index = this.arrImg.length - 1;
      return;
    }
    this.index--;
  }
  increaseIndex() {
    if (this.index == this.arrImg.length - 1) {
      this.index = 0;
      return;
    }
    this.index++;
  }
  changeIndex(i:number) {
    this.index=i;
  }

  reduce() {
    if (this.quantity > 1) {
      debugger
      this.quantity--;
    }
  }
  increase() {
    this.quantity++;
  }

  addToCart(){
    const item:Item={
      'idProduct':this.productId,
      'quantity':this.quantity
     };
     this.cartService.addToCart(item);
  }

  toBuy(){
    const items: Item[] = [
      { idProduct:this.productId,quantity:this.quantity}
    ];
    this.route.navigate(['/order'], { queryParams: { items: JSON.stringify(items) } });
  }
}
