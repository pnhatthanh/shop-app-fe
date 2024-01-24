import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../responses/Product';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../responses/category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,HeaderComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  products:Product[]=[];
  categories:Category[]=[];
  constructor(private router:Router,
    private productService:ProductService,
    private categoryService:CategoryService
    ){}
  ngOnInit(): void {
   this.productService.getProducts().subscribe({
    next:(products:Product[])=>{
      debugger
      this.products=products;
      for(let product of products){
        product.url_img=`http://localhost:8080/api/v1/products/thumbnail/${product.thumbnail}`;
      }
    },
    error:(error:any)=>{
      alert(`Cannot load product, error: ${error.error}`);
    },
    complete:()=>{
      debugger
    }
   })
   this.categoryService.getCategories().subscribe({
    next:(categories:Category[])=>{
      debugger
      this.categories=categories;
      for(let category of categories){
        category.url_img=`http://localhost:8080/api/v1/categories/symbol/${category.symbol}`;
      }
    },
    error:(error:any)=>{
      alert(`Cannot load categories, error: ${error.error}`);
    },
    complete:()=>{}
   })
  }

}