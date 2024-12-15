import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component'; // Update path as per your structure
import { FooterComponent } from '../../components/footer/footer.component'; // Update path as per your structure
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDisplayComponent } from '../../components/product-display/product-display.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, ProductDisplayComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
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

  modalProduct : any = {}
  displayProduct = false;

  cart: any = {};
  user : any = {};

  categories : any[] = []
  // categories = [
  //   {
  //     "name": "Electronics",
  //     "description": "Latest gadgets and devices.",
  //     "image": "https://images.unsplash.com/photo-1651936716950-7aca46b99653?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //   },
  //   {
  //     "name": "Fashion",
  //     "description": "Trendy clothing and accessories.",
  //     "image": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //   },
  //   {
  //     "name": "Home & Kitchen",
  //     "description": "Essentials for home and kitchen.",
  //     "image": "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //   },
  //   {
  //     "name": "Books",
  //     "description": "A wide range of books for all ages.",
  //     "image": "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //   },
  //   {
  //     "name": "Sports & Outdoors",
  //     "description": "Gear and equipment for sports and adventures.",
  //     "image": "https://images.unsplash.com/photo-1485809052957-5113b0ff51af?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //   }
  // ]

  bestSellers : any[] = []

  ngOnInit(): void {
    this.getCategories();
    this.getBestSellers();
    this.getUserCart();
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

  isProductInCart(productId : number) : boolean {
    if(this.cart.items) {
      var foundProduct = this.cart.items.find((productItem: any) => productItem.product_id === productId);
      if (foundProduct) {
        return true;
      } else {
        return false
      }
    } else {
      return false
    }
  }

  getCategories(): void {
    this.productService.getCategories().subscribe({
      next: (response) => {
        console.log(response)
        this.categories = response.data;
        localStorage.setItem("categories",JSON.stringify(this.categories))
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
        this.bestSellers = response.data;

        // for (let index = 0; index < this.bestSellers.length; index++) {
        //   this.getImage(this.bestSellers[index].name, index);
        //   this.bestSellers[index].details = JSON.stringify(this.bestSellers[index].details)
        // }

        console.log(this.bestSellers)
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }

  getImage(query : string, index : number) : void {
    this.productService.getImage(query.replace(' ', '+')).subscribe({
      next: (response) => {
        console.log(response)
        this.bestSellers[index].image = response.photos[0].src.original;
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

  goToCategory(category : any) {
    // this.router.navigate(['/category/'+category.name.toLowerCase()]);
    localStorage.setItem('category', JSON.stringify(category))
    this.router.navigate(['/category/'+category.name]);
  }

  goToCart() {
    this.router.navigate(['/checkout']);
  }
}
