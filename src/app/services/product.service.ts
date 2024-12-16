import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
  

  getUser(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}/user/${this.user.ID}`, {headers});
  }

  // Login API call
  getCategories(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}/categories`, {headers});
  }

  getBestSellers(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}/best-sellers`, {headers});
  }

  getAllProducts(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}/all-products`, {headers});
  }

  getProducts(category : string): Observable<any> {
    var body = {
      category : category
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}/get-products`, JSON.stringify(body), {headers});
  }

  getUserCart(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}/get-cart/${this.user.ID}`, {headers});
  }

  addToCart(products : any, quantity : number): Observable<any> {
    var body = {
      product_id : products[0].ID,
      quantity : quantity
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}/add-to-cart/${this.user.ID}`, JSON.stringify(body), {headers});
  }

  deleteFromCart(products : any, quantity : number): Observable<any> {
    var body = {
      product_id : products[0].ID,
      quantity : quantity
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}/delete-from-cart/${this.user.ID}`, JSON.stringify(body), {headers});
  }

  saveAddress(addrBody : any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}/save-address/${this.user.ID}`, JSON.stringify(addrBody), {headers});
  }

  applyCoupon(body : any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(`${this.apiUrl}/apply-coupon/${this.user.ID}`, JSON.stringify(body), {headers});
  }

  placeOrder(body : any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/place-order`, JSON.stringify(body), {headers});
  }

  getUserOrders(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiUrl}/get-orders/${this.user.ID}`, {headers});
  }

  getImage(query : string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `MzoYZg8oEPDg0oY0Xkt8nfTL8pD2stIEbdhiH2oIZLUn7MJq8vG8yxYN`,
    });
    return this.http.get(`https://api.pexels.com/v1/search?query=${query}&orientation=potrait&size=small&per_page=1`, { headers });
  }
  
}
