import { Component, OnInit } from '@angular/core';
import {  Router, RouterModule } from '@angular/router';
import { UserDetails } from '../../responses/UserDetails';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  user?:UserDetails|null;
  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.user=this.userService.getUserDetailsFromLocalStorage();
  }
  logout(){
    localStorage.clear();
    window.location.reload();
  }
}
