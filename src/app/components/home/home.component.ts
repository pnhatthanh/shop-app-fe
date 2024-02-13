import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../responses/Product';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../responses/category';
import { CartService } from '../../services/cart.service';
import { Item } from '../../dtos/item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  curentPage: number = 0;
  toltalItems:number=0;
  pages: number[]=[];
  limit: number = 12;
  idCategory:number=0;
  keyword:string="";
  constructor(private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService:CartService
  ) { }
  ngOnInit(): void {
    this.loadProducts(this.curentPage, this.limit);
    this.loadCategories();
  }

  loadProducts(page: number, limit: number): void {
    this.productService.searchProducts(page, limit,this.idCategory,this.keyword).subscribe({
      next: (data: any) => {
        debugger
        this.curentPage=page;
        this.toltalItems = data.totalElements;
        this.caculatePage();
        this.products = data.content;
        for (let product of this.products) {
          product.url_img = `http://localhost:8080/api/v1/products/thumbnail/${product.thumbnail}`;
        }
      },
      error: (error: any) => {
        alert(`Cannot load product, error: ${error.error}`);
      },
      complete: () => {
        debugger
      }
    })
  }  

  searchProducts(category:number){
    this.idCategory=category;
   this.loadProducts(0,this.limit);
  }

  caculatePage():void{
    const totalPages=Math.ceil(this.toltalItems/this.limit);
    this.pages=Array.from({length:totalPages},(_, i)=>i);
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        debugger
        this.categories = categories;
        for (let category of categories) {
          category.url_img = `http://localhost:8080/api/v1/categories/symbol/${category.symbol}`;
        }
      },
      error: (error: any) => {
        alert(`Cannot load categories, error: ${error.error}`);
      },
      complete: () => { }
    })
  }
  goToDetailProduct(id:number){
    this.router.navigate(['/detail_product',id]);
  }

  addToCart(id:number){
     const item:Item={
      'idProduct':id,
      'quantity':1
     };
     this.cartService.addToCart(item);
  }

  toBuy(id:number){
    const items: Item[] = [
      { idProduct:id,quantity:1 }
    ];
    console.log(items);
    this.router.navigate(['/order'], { queryParams: { items: JSON.stringify(items) } });
  }
}