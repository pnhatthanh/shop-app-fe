import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { CartComponent } from './components/cart/cart.component';
import { ErrorComponent } from './components/error/error.component';
import { SuccessOrderComponent } from './components/success-order/success-order.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'detail_product/:id', component: DetailProductComponent },
    { path: 'order', component: OrderComponent },
    { path: 'cart', component: CartComponent },
    {path:'success-order',component:SuccessOrderComponent},
    { path: '**', component: ErrorComponent },
];
