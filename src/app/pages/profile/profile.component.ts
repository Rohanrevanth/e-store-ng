import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductDisplayComponent } from '../../components/product-display/product-display.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, HeaderComponent, ProductDisplayComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  orders  : any[]= []
  user : any = {}
  cart: any = {};

  
  modalProduct : any = {}
  displayProduct = false;

  constructor(
    private router: Router,
    private productService: ProductService,
  ) {
    var userObjStr = localStorage.getItem("user");
    if(userObjStr) {
      this.user = JSON.parse(userObjStr);
      console.log(this.user);
    }
  }

  ngOnInit(): void {
    // Here you can fetch orders from an API, e.g., using HttpClient
    // Example:
    // this.http.get('/api/orders').subscribe(data => this.orders = data);
    this.getUserCart();
    this.getUserOrders();
  }
  
  getUserCart(): void {
    this.productService.getUserCart().subscribe({
      next: (response) => {
        console.log(response)
        this.cart = response.data;
        console.log(this.cart)
        // localStorage.setItem("categories",JSON.stringify(this.categories))
        // this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }
  
  getUserOrders(): void {
    this.productService.getUserOrders().subscribe({
      next: (response) => {
        console.log(response)
        this.orders = response.data.reverse();
        console.log(this.orders)
        for (let index = 0; index < this.orders.length; index++) {
          this.orders[index].shipping_details = JSON.parse(this.orders[index].shipping_details);
        }
        // localStorage.setItem("categories",JSON.stringify(this.categories))
        // this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }
  
  openProductModal(product : any) {
    this.modalProduct = product;
    this.displayProduct = true;
  }

  closeModal() {
    this.displayProduct = false;
  }

  addToCart(product: any) {
    this.productService.addToCart([product], 1).subscribe({
      next: (response) => {
        console.log(response);
        alert(`${product.name} has been added to your cart!`);
        this.goToCart();
        // this.bestSellers[index].image = response.photos[0].src.original;
        // this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }

  goToCart() {
    this.router.navigate(['/checkout']);
  }
}
