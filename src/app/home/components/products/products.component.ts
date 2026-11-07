import { AsyncPipe, CurrencyPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgForOf, RatingsComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  constructor(public productStoreItem: ProductsStoreItem) {}
}
