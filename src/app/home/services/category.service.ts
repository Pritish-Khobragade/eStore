import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../types/category.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private HttpClient: HttpClient) { }

  getAllCategories() : Observable<Category[]> {
    return this.HttpClient.get<Category[]>(
      'http://localhost:5001/productCategories'
    );
  }

}
