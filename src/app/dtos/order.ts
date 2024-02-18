import { Item } from "./item";

export interface orderDto{
    userId:number;
    fullName:string;
    email:string;
    phoneNumber:string;
    address:string;
    note:string;
    totalMoney:number;
    shippingMethod:string;
    shippingAddress:string;
    shippingDate:Date;
    paymentMethod:string;
    items:Item[];
}