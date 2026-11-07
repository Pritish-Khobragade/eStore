import { Component } from '@angular/core';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { RatingsComponent } from '../../../shared/components/ratings/ratings.component';
import { Product } from '../../types/products.type';
import { ProductsService } from '../../services/product/products.service';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, RatingsComponent],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent {
  readonly product$: Observable<Product | null>;

  constructor(route: ActivatedRoute, productService: ProductsService) {
    this.product$ = route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => Number.isInteger(id) && id > 0 ? productService.getProduct(id) : of(null))
    );
  }
}
