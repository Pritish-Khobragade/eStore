import { Product } from '../../types/products.type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor(private HttpClient: HttpClient) { }

  getAllProducts(query?: string): Observable<Product[]> {
    let url : string = 'http://localhost:5001/products';
    if(query) {
      url += '?' + query;
    }
    return this.HttpClient.get<Product[]>(url);
  }

  getProduct(id: number): Observable<Product | null> {
    const url: string ='http://localhost:5001/products/' + id;
    return this.HttpClient.get<Product | null>(url);

  }
}
