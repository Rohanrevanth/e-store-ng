
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
// import { Product } from './product.model'; // Assuming you have a Product model
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-display',
  imports: [ CommonModule],  
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent {
  @Input() product: any;  // Input for the product object passed from parent
  @Input() cart: any;  // Input for the product object passed from parent
  @Output() closeModal = new EventEmitter<void>(); // EventEmitter to send close event to parent
  
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    
  }

  // Method to emit the close event
  onCloseModal() {
    this.closeModal.emit();
  }

  onBackdropClick(): void {
    this.closeModal.emit(); // Close the modal when clicking the backdrop
  }

  addToCart(product: any) {
    this.productService.addToCart([product], 1).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.warning( `${product.name} has been added to your cart!`, 'Cart Updated!');
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

  isProductInCart(productId : number) : boolean {
    console.log(this.cart)
    if(this.cart.items) {
      const foundProduct = this.cart.items.find((productItem: any) => productItem.product_id === productId);
      if (foundProduct) {
        return true;
      } else {
        return false
      }
    } else {
      return false
    }
  }
  
  goToCart() {
    this.router.navigate(['/checkout']);
  }
}
