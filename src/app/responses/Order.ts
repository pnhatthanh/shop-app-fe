export interface Order{
    id:number;
    fullName:string;
    phoneNumber:string;
    note:string;
    orderDate:Date;
    totalMoney:number;
    shippingMethod:string;
    shippingAddress:string;
    shippingDate:Date;
    status:string;
    paymentMethod:string;
}