import { products } from './products.data';
import { ProductListItem } from './products.type';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {

  constructor() { }

  getProductsList(): ProductListItem[] {
      return products;
  }

}
