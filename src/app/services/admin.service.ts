import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080'; // Replace with your backend URL

  user : any = {};
  token : string = "";
  

  constructor(private http: HttpClient) {
    var userObjStr = localStorage.getItem("user");
    if(userObjStr) {
      this.user = JSON.parse(userObjStr);
      console.log(this.user);
    }
    var tokenStr = localStorage.getItem("token");
    if(tokenStr) {
      this.token = tokenStr;
      console.log(this.token);
    }
  }

  getCoupons(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}/get-coupons`,{headers});
  }

  addCoupon(coupon: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}/add-coupon`, coupon, {headers});
  }

  saveCoupon(coupon: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}/update-coupon`, coupon, {headers});
  }

  deleteCoupon(coupon: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}/delete-coupon`, coupon, {headers});
  }
  
  getAllOrders(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    // return this.http.get(`${this.apiUrl}/get-all-orders`,{headers});
    return this.http.get(`${this.apiUrl}/get-orders`,{headers});
  }
  
}
