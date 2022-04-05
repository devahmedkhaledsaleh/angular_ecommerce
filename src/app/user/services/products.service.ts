import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IProduct } from '../../models/i-product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/api/products/getAllProducts`
    );
  }


  getProductById(ProductId: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(
      `${environment.apiUrl}/api/products/getProductById/${ProductId}`
    );
  }

  getAllProductsByCategoryName(categoryName: string): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/api/products/getProductByCategory/${categoryName}`
    );
  }

  getProductsBySearch(productName: string): Observable<IProduct[]> {
    if (!productName.trim()) {
      return of([]);
    }
    return this.httpClient.get<IProduct[]>(
      `${environment.apiUrl}/products?name=${productName}`
    );
  }
}
