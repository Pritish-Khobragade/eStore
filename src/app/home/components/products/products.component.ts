import { ProductListItem } from './products.type';
import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CurrencyPipe, NgForOf, RatingsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [ProductsService]
})
export class ProductsComponent {
  products: ProductListItem[] = [];

  constructor(ProductsService: ProductsService){
    this.products = ProductsService.getProductsList();
  }
}
