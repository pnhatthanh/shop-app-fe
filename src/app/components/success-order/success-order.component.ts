import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-success-order',
  standalone: true,
  imports: [HeaderComponent,FooterComponent],
  templateUrl: './success-order.component.html',
  styleUrl: './success-order.component.scss'
})
export class SuccessOrderComponent {

}
