import { Product } from './products.type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor(private HttpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.HttpClient.get<Product[]>('http://localhost:5001/products');
  }


}
