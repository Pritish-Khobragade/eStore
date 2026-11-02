import { AsyncPipe, CurrencyPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { ProductsStoreItem } from '../../services/product/products.storeItem';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgForOf, RatingsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(public productStoreItem: ProductsStoreItem) {}
}
