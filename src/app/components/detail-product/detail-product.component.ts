import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailProduct } from '../../responses/DetailProduct';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [FooterComponent, HeaderComponent,FormsModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  private productId: number = 0;
  detailProduct?: DetailProduct;
  quantity:number=1;
  constructor(private productService: ProductService,
    private router: ActivatedRoute) { }
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
    })
  }
  reduce(){
    if(this.quantity>1){
      debugger
      this.quantity--;
    }
  }
  increase(){
    this.quantity++;
  }
}
