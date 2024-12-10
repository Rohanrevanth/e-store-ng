import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
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

  slug: any = "";
  category : any = {};

  products : any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ){}

  ngOnInit(): void {
    // Retrieve the 'slug' parameter from the route
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug');
      console.log('Slug:', this.slug); // Log the slug for debugging
      this.getProducts();
    });
  }

  getProducts(): void {
    var category = localStorage.getItem('category');
    if(category) {
      this.category = JSON.parse(category)
    }
    console.log(this.category)
    this.productService.getProducts(this.slug).subscribe({
      next: (response) => {
        console.log(response)
        this.products = response.data;
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
}

