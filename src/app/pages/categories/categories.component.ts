import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component'; // Update path as per your structure
import { FooterComponent } from '../../components/footer/footer.component'; // Update path as per your structure
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDisplayComponent } from '../../components/product-display/product-display.component';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, HeaderComponent, FooterComponent, ProductDisplayComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  slug: any = "";
  category : any = {};

  products : any[] = [];
  cart : any = {}

  modalProduct : any = {}
  displayProduct = false;

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
      this.getUserCart();
    });
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

  openProductModal(product : any) {
    this.modalProduct = product;
    this.displayProduct = true;
  }

  closeModal() {
    this.displayProduct = false;
  }
}

