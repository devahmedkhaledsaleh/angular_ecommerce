import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpOption;
  constructor(private httpClient: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token'
      }),
    };
  }

  addOrder(newOrder: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiUrl}/api/orders/checkout`,
      newOrder,
      this.httpOption
    );
  }

  getOrdersByUserId(token: string) {
    return this.httpClient.post<string>(
      `${environment.apiUrl}/api/orders/getOrdersByUserId`,
      {
        
          token: token,
        
      }
    );
  }
}
