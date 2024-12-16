import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDisplayComponent } from "../../components/product-display/product-display.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HeaderComponent, ProductDisplayComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService,

  ) {
    var userObjStr = localStorage.getItem("user");
    if(userObjStr) {
      this.user = JSON.parse(userObjStr);
      var addressList = this.user.saved_address ? this.user.saved_address : [];
      console.log(this.user);
      if(addressList.length > 0) {
        this.formatAddress(addressList);
      } else {
        this.isAddressEditing = true;
      }
    }
    this.getUserCart();
  }

  formatAddress(addressList : any[]) {
    var addrList = [];
    for (let index = 0; index < addressList.length; index++) {
      var addr = JSON.parse(addressList[index]);
      addrList.push(addr);
    }
    this.addressList = addrList;
    this.editAddressIndex = 0;
    this.shippingDetails = this.addressList[0];
  }

  stringifyAddresses() : any {
    var addrList = [];
    for (let index = 0; index < this.addressList.length; index++) {
      var addr = JSON.stringify(this.addressList[index]);
      addrList.push(addr);
    }
    return addrList;
  }

  user : any = {};
  cart : any = {};

  
  modalProduct : any = {}
  displayProduct = false;

  addressList : any[] = [];
  isAddressEditing = false;
  isNewAddress = false;
  editAddressIndex = -1;

  shippingDetails : any = {};
  
  // shippingDetails = {
  //   name: '',
  //   address: '',
  //   city: '',
  //   zip: '',
  //   phone: ''
  // };
  paymentMethod = '';
  // totalPrice = this.cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  couponCode: string | null= null;
  couponMessage: string = '';
  discount: number = 0;

  onSubmit() {
    console.log('Form Submitted', this.shippingDetails);
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

  get totalPrice() {
    const subtotal = this.cart.items ? this.cart.items.reduce((total: number, item: any) => total + item.product.price * item.quantity, 0) : 0;
    return subtotal - this.discount;
  }

  increaseQuantity(index: number) {
    this.cart.items[index].quantity++;
    this.applyCoupon();
    this.addToCart(this.cart.items[index].product)
  }
  
  addToCart(product: any) {
    this.productService.addToCart([product], 1).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.warning( `${product.name} has been added to your cart!`, 'Cart Updated!');

        this.getUserCart();
        // this.bestSellers[index].image = response.photos[0].src.original;
        // this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }

  decreaseQuantity(index: number) {
    if (this.cart.items[index].quantity > 1) {
      this.cart.items[index].quantity--;
    }
    this.applyCoupon();
    this.deleteFromCart(this.cart.items[index].product, 1)
  }

  removeItem(index: number) {
    this.deleteFromCart(this.cart.items[index].product, this.cart.items[index].quantity)
    this.cart.items.splice(index, 1);
    this.applyCoupon();
  }
  
  deleteFromCart(product: any, count : number) {
    this.productService.deleteFromCart([product], count).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.warning( `${product.name} has been deleted from your cart!`, 'Cart Updated!');
        this.getUserCart();
        // this.bestSellers[index].image = response.photos[0].src.original;
        // this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }

  applyCoupon() {
    if(!this.couponCode || this.couponCode.trim() == "") {
      return;
    }

    var body = {
      coupon_code : this.couponCode.toLocaleUpperCase().trim()
    }
    this.productService.applyCoupon(body).subscribe({
      next: (response) => {
        console.log(response);
        if(response.data.discount) {
          this.discount = (this.cart.items.reduce((total: number, item: { product: { price: number; }; quantity: number; }) => total + item.product.price * item.quantity, 0) * response.data.discount) / 100;
          this.couponMessage = `Coupon applied! You saved ₹${this.discount.toFixed(2)}.`;
        } else {
          this.discount = 0;
          this.couponMessage = `Invalid coupon code or code not applicable.`;
          this.couponCode = null;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isDisablePlaceOrder() : boolean {
    if(!this.shippingDetails) {
      return false;
    }else if(
      (this.shippingDetails.name && this.shippingDetails.name.trim() == '') || 
      (this.shippingDetails.address && this.shippingDetails.address.trim() == '') || 
      (this.shippingDetails.city && this.shippingDetails.city.trim() == '') || 
      (this.shippingDetails.zip && this.shippingDetails.zip.trim() == '') || 
      (this.shippingDetails.phone && this.shippingDetails.phone.trim() == '') || 
      (this.shippingDetails.name && this.shippingDetails.name.trim() == '') || 
      this.paymentMethod.trim() == '' || 
      !this.cart || this.cart.items.length == 0) {
      return true;
    }
    return false;
  }

  saveAddress() {
    this.isAddressEditing = false;

    if(this.editAddressIndex > -1) {
      this.addressList[this.editAddressIndex] = this.shippingDetails;
    }

    if(this.isNewAddress) {
      this.addressList.push(this.shippingDetails)
    }

    var body = {
      address : this.stringifyAddresses()
    }
    this.productService.saveAddress(body).subscribe({
      next: (response) => {
        console.log(response);
        this.getUser();
        this.editAddressIndex = -1;
        this.isNewAddress = false;
        // localStorage.setItem("categories",JSON.stringify(this.categories))
        // this.isLoading = false;
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }

  selectAddress(address : any, index : number) {
    this.shippingDetails = address;
    this.isAddressEditing = false;
    this.isNewAddress = false;
    this.editAddressIndex = index;
  }

  editAddress(address: any, index: number): void {
    console.log('Edit Address:', address);
    this.shippingDetails = JSON.parse(JSON.stringify(address));
    this.isAddressEditing = true;
    this.editAddressIndex = index;
    this.isNewAddress = false;
    // Implement your edit logic here
  }

  deleteAddress(address: any, index: number) {
    this.addressList.splice(index, 1);
    this.isNewAddress = false;
    this.saveAddress();
  }

  addNewAddress() {
    this.shippingDetails = {};
    this.isAddressEditing = true;
    this.isNewAddress = true;
    this.editAddressIndex = -1;
  }

  getUser(): void {
    this.productService.getUser().subscribe({
      next: (response) => {
        console.log(response)
        this.user = response.data;
        localStorage.setItem("user", JSON.stringify(this.user));
        var addressList = this.user.saved_address ? this.user.saved_address : [];
        this.formatAddress(addressList);
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }

  placeOrder() {
    console.log(this.shippingDetails)
    console.log(this.couponCode)
    console.log(this.paymentMethod)
    console.log('Order placed with payment method:', this.paymentMethod);
    var body = {
      user_id : String(this.user.ID),
      payment_method : this.paymentMethod,
      coupon_code : this.couponCode ? this.couponCode.toLocaleUpperCase() : null,
      shipping_details : JSON.stringify({
        name : this.shippingDetails.name,
        address : this.shippingDetails.address,
        city : this.shippingDetails.city,
        zip : this.shippingDetails.zip,
        phone : this.shippingDetails.phone,
      })
    }

    this.productService.placeOrder(body).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.warning( `Order has been placed!`, 'Success!');
        this.router.navigate(['/home']);
        // this.getUserCart();
        // this.bestSellers[index].image = response.photos[0].src.original;
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
