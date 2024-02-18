import { Component,OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDto } from '../../dtos/user/login.dto';
import { LoginResponse } from '../../responses/LoginResponse';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../responses/role';
import { UserDetails } from '../../responses/UserDetails';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent,HeaderComponent,
    CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  phoneNumber:string;
  password:string;
  roles:Role[]=[];
  selectedRole:Role|undefined=undefined;
  constructor(private router:Router,
     private userService:UserService,
     private roleService:RoleService,
     private tokenService:TokenService,
    ){
    this.phoneNumber="";
    this.password="";
  }
  ngOnInit(){
    this.roleService.getRoles().subscribe({
      next:(roles:Role[])=>{
        debugger
        this.roles=roles;
      },
      error:(error:any)=>{
        alert(`Cannot load role, ${error.error}`);
      },
      complete:()=>{
        debugger
      }
    })
  }
  login(){
    const loginDto:LoginDto={
      'phoneNumber':this.phoneNumber,
      'password':this.password,
      'roleId':this.selectedRole?.id ?? 0
    }
    this.userService.login(loginDto).subscribe({
      next: (response: LoginResponse) => {
        const {token}=response;
        this.tokenService.setToken(token);
        this.userService.getUserDetail(token).subscribe({
          next: (response:any)=>{
            const userDetails:UserDetails={
              id:response.id,
              fullName:response.fullName,
              dateOfBirth:new Date(response.dateOfBirth),
              phoneNumber:response.phoneNumber,
              address:response.address,
              facebookAccountId:response.facebookAccountId,
              googleAccountId:response.googleAccountId
            };
            this.userService.saveUsertoLocalStorage(userDetails);
            this.router.navigate(['/'])
          },
          error: (error: any) => {
            debugger;
            alert(error.error);
          },
          complete:()=>{}
        })  
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    })
  }
}
