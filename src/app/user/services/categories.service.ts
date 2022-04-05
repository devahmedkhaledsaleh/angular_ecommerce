import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ICategory } from '../../models/i-category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAllCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${environment.apiUrl}/categories`);
  }
}
