import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Login API call
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getBestSellers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/best-sellers`);
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all-products`);
  }

  getProducts(category : string): Observable<any> {
    var body = {
      category : category
    }
    return this.http.post(`${this.apiUrl}/get-products`, JSON.stringify(body));
  }

  getImage(query : string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `MzoYZg8oEPDg0oY0Xkt8nfTL8pD2stIEbdhiH2oIZLUn7MJq8vG8yxYN`,
    });
    return this.http.get(`https://api.pexels.com/v1/search?query=${query}&orientation=potrait&size=small&per_page=1`, { headers });
  }
  
}
