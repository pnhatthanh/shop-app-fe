import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'login', component: LoginComponent },  
    { path: 'register', component: RegisterComponent }
];