import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AdminService } from '../../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from "../../components/order-details/order-details.component";

interface Coupon {
  id?: any; // Optional ID for new coupons
  code: string;
  discount: number;
  order_frequency: number;
  isEditable?: boolean;
  UpdatedAt?: Date;
  CreatedAt?: Date;
}

@Component({
  selector: 'app-admin-panel',
  imports: [HeaderComponent, ReactiveFormsModule, FormsModule, CommonModule, OrderDetailsComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  user: any = {};

  coupons: Coupon[] = [];
  // coupons: any[] = [
  //   { code: 'SAVE20', isActive: true, discount: 20 },
  //   { code: 'NEWYEAR50', isActive: false, discount: 50 },
  // ];
  newCoupon: Coupon = { code: '', discount: 0, order_frequency: 0 };
  isAddingCoupon = false;


  totalOrders: number = 0;
  totalRevenue: number = 0;
  avgOrderValue: number = 0;
  totalDiscounts: number = 0;

  totalProductsSold: number = 0;
  topSellingProduct: any = { name: '', quantity: 0, revenue: 0 };

  couponUsageMap: { [key: string]: number } = {};
  couponDiscountMap: { [key: string]: number } = {};

  totalCoupons: number = 0;
  totalCouponsUsed: number = 0;
  totalCouponDiscount: number = 0;
  discountCodes: string[] = [];
  orders : any[] = []


  frequentPaymentMethod: string = '';
  pendingOrders: number = 0;
  shippedOrders: number = 0;
  completedOrders: number = 0;


  mostUsedCoupon: any = {};
  topDiscountCoupon: any = {};
  // unusedCoupons: number = 0;

  showOrderDetails = false;
  modalOrder = {};


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private adminService: AdminService,
  ){
    var userObjStr = localStorage.getItem("user");
    if(userObjStr) {
      this.user = JSON.parse(userObjStr);
      console.log(this.user);
    }
  }
  
  ngOnInit(): void {
    this.loadCoupons();
    this.getAllOrders();
  }

  loadCoupons(): void {
    this.adminService.getCoupons().subscribe({
      next: (response) => {
        console.log(response)
        this.coupons = response.data;
        this.getAllOrders();
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }

  getAllOrders(): void {
    this.adminService.getAllOrders().subscribe({
      next: (response) => {
        console.log(response)
        this.orders = response.data;
        // this.calculateSummary();
        this.calculateOrderSummary();
        this.calculateProductSummary();
        this.calculateCouponSummary();

  // Example calculations (adjust as per your data structure)
  this.pendingOrders = this.orders.filter(order => order.status === 'Pending').length;
  this.shippedOrders = this.orders.filter(order => order.status === 'Shipped').length;
  this.completedOrders = this.orders.filter(order => order.status === 'Completed').length;

  this.orders.forEach(order => {
    if (order.coupon_code) {
      this.couponUsageMap[order.coupon_code] = (this.couponUsageMap[order.coupon_code] || 0) + 1;
      this.couponDiscountMap[order.coupon_code] = (this.couponDiscountMap[order.coupon_code] || 0) + order.discount;
    }
  });
  this.mostUsedCoupon = Object.entries(this.couponUsageMap).reduce(
    (max, [coupon, count]) => (count > max.count ? { coupon, count } : max),
    { coupon: '', count: 0 }
  );
  this.topDiscountCoupon = Object.entries(this.couponDiscountMap).reduce(
    (max, [coupon, totalDiscount]) =>
      totalDiscount > max.totalDiscount ? { coupon, totalDiscount } : max,
    { coupon: '', totalDiscount: 0 }
  );
  // this.mostUsedCoupon = this.coupons.reduce((max, coupon) => coupon.usageCount > max.usageCount ? coupon : max, { usageCount: 0 });
  // this.topDiscountCoupon = this.coupons.reduce((max, coupon) => coupon.discountAmount > max.discountAmount ? coupon : max, { discountAmount: 0 });

  this.frequentPaymentMethod = this.orders
    .map(order => order.paymentMethod)
    .reduce((a, b, i, arr) =>
      arr.filter(v => v === a).length > arr.filter(v => v === b).length ? a : b, '');


        
      },
      error: (err) => {
        console.log(err)
        // this.isLoading = false;
      },
    });
  }


  calculateOrderSummary(): void {
    this.totalOrders = this.orders.length;
    this.totalRevenue = this.orders.reduce((sum, order) =>(order.total_price ? sum + order.total_price : sum), 0);
    console.log("this.totalRevenue", this.totalRevenue)
    this.totalDiscounts = this.orders.reduce((sum, order) => (order.discount ? sum + order.discount : sum), 0);
    if(this.totalOrders > 0)
    this.avgOrderValue = this.totalRevenue / this.totalOrders;
  }

  calculateProductSummary(): void {
    const productMap: any = {};
    this.orders.forEach((order) => {
      order.order_items.forEach((item: any) => {
        if (!productMap[item.product.name]) {
          productMap[item.product.name] = { quantity: 0, revenue: 0 };
        }
        productMap[item.product.name].quantity += item.quantity;
        productMap[item.product.name].revenue += item.quantity * item.product.price;
      });
    });

    const products = Object.keys(productMap).map((name) => ({
      name,
      ...productMap[name],
    }));

    

    this.totalProductsSold = products.reduce((sum, p) => sum + p.quantity, 0);
    this.topSellingProduct = products.sort((a, b) => b.quantity - a.quantity)[0];
  }

  calculateCouponSummary(): void {
    this.totalCoupons = this.coupons.length;
    this.totalCouponsUsed = this.orders.filter((order) => order.coupon_code).length;
    this.totalCouponDiscount = this.orders.reduce((sum, order) => (order.discount ? sum + order.discount : sum), 0);
  }

  calculateProductsInOrder(order : any) : number {
    var totalProducts = 0
    order.order_items.forEach((item: any) => {
      totalProducts = totalProducts + item.quantity;
    });
    return totalProducts;
  }


  editCoupon(coupon: any) {
    coupon.isEditable = true;
  }

  cancelEdit(coupon:any) {
    coupon.isEditable = false;
    // Optionally, reset fields if needed
  }


  toggleAddCouponForm() {
    this.isAddingCoupon = !this.isAddingCoupon;
  }

  cancelAddCoupon() {
    this.isAddingCoupon = false;
    this.newCoupon = { code: '', discount: 0, order_frequency: 0 }; // Reset form
  }

  saveCoupon(coupon : any): void {
    console.log(coupon)
    if(coupon.code == "" || coupon.discount == 0 || coupon.order_frequency == 0) {
      return;
    }
    if (coupon.ID) {
      // If the coupon already has an ID, update the coupon
      this.adminService.saveCoupon(coupon).subscribe(() => {
        this.loadCoupons();  // Reload coupons after update
      });
    } else {
      // If the coupon is new (doesn't have an ID), create it
      this.adminService.addCoupon(coupon).subscribe(() => {
        this.cancelAddCoupon()
        this.loadCoupons();  // Reload coupons after adding
      });
    }
    coupon.isEditable = false;
  }

  deleteCoupon(coupon : any): void {
    this.adminService.deleteCoupon(coupon).subscribe(() => {
      this.loadCoupons();
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Optional: Use 12-hour format
    });
  }

  showOrder(order : any) {
    this.modalOrder = order;
    this.showOrderDetails = true;
  }

  closeModal() {
    this.showOrderDetails = false;
  }
}
