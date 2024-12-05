import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component'; // Update path as per your structure
import { FooterComponent } from '../../components/footer/footer.component'; // Update path as per your structure
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private productService: ProductService,
  ) {

  }

  categories = [
    {
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop',
    },
    {
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=500&h=300&fit=crop',
    },
    {
      name: 'Home Appliances',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop',
    },
    {
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?w=500&h=300&fit=crop',
    },
    {
      name: 'Toys',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop',
    },
  ];

  bestSellers = [
    {
      name: 'Smartphone',
      price: 699.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop',
    },
    {
      name: 'Laptop',
      price: 1099.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=300&fit=crop',
    },
    {
      name: 'Wireless Earbuds',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&h=300&fit=crop',
    },
    {
      name: 'Watch',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500&h=300&fit=crop',
    },
    {
      name: 'Camera',
      price: 499.99,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=300&fit=crop',
    },
  ];

  ngOnInit(): void {
    this.getCategories();
    this.getBestSellers();
  }

  getCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response) => {
        console.log(response)
        // this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }
  
  getBestSellers(): void {
    this.productService.getBestSellers().subscribe({
      next: (response) => {
        console.log(response)
        // this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }

  cart: any[] = [];

  addToCart(product: any) {
    this.cart.push(product);
    alert(`${product.name} has been added to your cart!`);
  }

  goToCategory(category : any) {
    this.router.navigate(['/category/'+category.name.toLowerCase()]);
  }
}
