import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterDto } from '../../dtos/user/register.dto';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, 
    FormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild("registerform") registerForm!: NgForm;
  phoneNumber: String;
  password: String;
  retypePassword: String;
  fullName: String;
  address: String;
  dateOfBirth: Date;
  isAccepted: boolean;

  constructor(private router: Router,private userService:UserService) {
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
    this.isAccepted = false;
  }

  register() {
    const registerDto: RegisterDto = {
      "fullName": this.fullName,
      "dateOfBirth": this.dateOfBirth,
      "phoneNumber": this.phoneNumber,
      "address": this.address,
      "password": this.password,
      "retypePassword": this.retypePassword,
      "facebookAccountId": 0,
      "googleAccountId": 0,
      "roleId": 1
    }
    this.userService.register(registerDto).subscribe({
      next: (response: any) => {debugger
        const confirmation = window
            .confirm('Đăng ký thành công, mời bạn đăng nhập. Bấm "OK" để chuyển đến trang đăng nhập.');
          if (confirmation) {
            this.router.navigate(['/login']);
          }
      },
      error: (error: any) => {alert(`Cannot register, error: ${error.error}`)},
      complete: () => {debugger}
    })
  }

  checkPasswordsMatch() {
    if (this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword']
        .setErrors({ 'passwordMismatch': true });
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }
}
