import { Product } from "./Product";

export interface DetailOrder{
    product:Product;
    price:number;
    numberOfProduct:number;
    totalMoney:number;
}