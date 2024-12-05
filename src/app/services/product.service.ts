import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Login API call
  getCategories(): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, {  });
  }

  getBestSellers(): Observable<any> {
    return this.http.post(`${this.apiUrl}/best-sellers`, {});
  }

  getProducts(): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, {});
  }
  
}
