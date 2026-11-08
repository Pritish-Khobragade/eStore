import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RatingsComponent } from '../../../../shared/components/ratings/ratings.component';
import { CartStoreItem } from './../../../services/cart/cart.storeItem';
import { CartItem } from './../../../types/cart.type';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgForOf, NgIf, RatingsComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  readonly cart$;

  constructor(private cartStore: CartStoreItem) {
    this.cart$ = this.cartStore.cart$;
  }

  updateQuantity(action: '+' | '-', cartItem: CartItem): void {
    if (action === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if (action === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }
}
