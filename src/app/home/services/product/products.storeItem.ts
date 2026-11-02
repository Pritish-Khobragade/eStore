import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreItem } from '../../../shared/storeItems';
import { Product } from '../../types/products.type';
import { ProductsService } from './products.service';

@Injectable()
export class ProductsStoreItem extends StoreItem<Product[]> {
  constructor(private productsService: ProductsService) {
    super([]);
  }

  async loadProducts(query?: string) {
    this.productsService.getAllProducts(query).subscribe(products => {
      this.setValue(products);
    });
  }

  get products(): Observable<Product[]> {
    return this.value$;
  }

}