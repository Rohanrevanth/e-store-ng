import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartItemCount: number = 0;

  constructor(
    private router: Router
  ) {
    // Simulate cart item count (this should come from a service in a real app)
    this.cartItemCount = 3;
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
