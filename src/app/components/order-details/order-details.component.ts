import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent implements OnInit {

  
  @Input() order: any;  // Input for the product object passed from parent
  @Output() closeModal = new EventEmitter<void>(); // EventEmitter to send close event to parent

  // order: any = {
  //   ID: 12,
  //   CreatedAt: '2024-12-15T16:44:41.7194646+05:30',
  //   UpdatedAt: '2024-12-15T16:44:41.7194646+05:30',
  //   user_id: '2',
  //   payment_method: 'cod',
  //   status: 'Pending',
  //   order_items: [
  //     {
  //       ID: 13,
  //       product_id: 30,
  //       product: {
  //         name: 'Double Yoga Mat',
  //         description:
  //           'Achieve your fitness goals with this non-slip yoga mat. Designed for comfort and durability, this mat provides excellent cushioning and support during yoga, Pilates, or stretching exercises.',
  //         image: 'https://images.pexels.com/photos/864939/pexels-photo-864939.jpeg',
  //         category: 'Sports & Outdoors',
  //         price: 799,
  //       },
  //       quantity: 1,
  //       price: 799,
  //     },
  //   ],
  //   total_price: 639.2,
  //   discount: 159.8,
  //   coupon_code: 'SAVE20',
  //   shipping_details:
  //     '{"name":"Rohan Revanth Sagarrrr","address":"Sobha Jasmine","city":"Bangalore","zip":"560087","phone":"08473893929"}',
  // };

  shippingDetails: any = {};

  ngOnInit(): void {
    this.shippingDetails = JSON.parse(this.order.shipping_details);
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  onBackdropClick(): void {
    this.closeModal.emit(); // Close the modal when clicking the backdrop
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
}
