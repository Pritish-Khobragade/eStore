import { Component } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { Product } from '../../types/products.type';
import { ProductsService } from '../../services/product/products.service';
import { CartStoreItem } from '../../services/cart/cart.storeItem';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgIf, FontAwesomeModule, RatingsComponent],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent {
  readonly product$: Observable<Product | null>;
  faShoppingCart = faCartShopping;

  constructor(route: ActivatedRoute, productService: ProductsService, private cart: CartStoreItem) {
    this.product$ = route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => Number.isInteger(id) && id > 0 ? productService.getProduct(id) : of(null))
    );
  }



  addToCart(product: Product): void {
    this.cart.addProduct(product);
  }
}
