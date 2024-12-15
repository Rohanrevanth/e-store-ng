import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user : any = {};
  userCart : any = {
    items : []
  }

  constructor(
    private router: Router,
    private productService: ProductService,
  ) {
    var userObjStr = localStorage.getItem("user");
    if(userObjStr) {
      this.user = JSON.parse(userObjStr);
      console.log(this.user);
      this.getUserCart();
    }
  }

  getUserCart(): void {
    this.productService.getUserCart().subscribe({
      next: (response) => {
        console.log(response)
        this.userCart = response.data;
        // localStorage.setItem("categories",JSON.stringify(this.categories))
        // this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
