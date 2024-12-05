import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component'; // Update path as per your structure
import { FooterComponent } from '../../components/footer/footer.component'; // Update path as per your structure
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  slug: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ){}

  ngOnInit(): void {
    // Retrieve the 'slug' parameter from the route
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      console.log('Slug:', this.slug); // Log the slug for debugging
      // You can now use this.slug to fetch data or for other purposes
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
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

  products = [
    {
      name: 'Wireless Headphones',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
    },
    {
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop',
    },
    {
      name: 'Gaming Keyboard',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop',
    },
    {
      name: 'Wireless Headphones',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
    },
    {
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop',
    },
    {
      name: 'Gaming Keyboard',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop',
    },
    {
      name: 'Wireless Headphones',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
    },
    {
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop',
    },
    {
      name: 'Gaming Keyboard',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop',
    },
    {
      name: 'Wireless Headphones',
      price: 99.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
    },
    {
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop',
    },
    {
      name: 'Gaming Keyboard',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=300&fit=crop',
    },
    // Add more products here
  ];

  cart: any[] = [];

  addToCart(product: any) {
    this.cart.push(product);
    alert(`${product.name} has been added to your cart!`);
  }
}

