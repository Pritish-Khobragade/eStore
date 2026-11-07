import { AsyncPipe, CurrencyPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { ProductsStoreItem } from '../../services/product/products.storeItem';
import { RouterLink } from '@angular/router';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {Product} from '../../types/products.type';
import {CartStoreItem} from '../../services/cart/cart.storeItem';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgForOf, FontAwesomeModule, RatingsComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  faShoppingCart = faShoppingCart;

  constructor(public productStoreItem: ProductsStoreItem,private cart:CartStoreItem) {}

  addToCart(product: Product){
    this.cart.addProduct(product);
  }
}
