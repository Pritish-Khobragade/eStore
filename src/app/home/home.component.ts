import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { CategoryService } from './services/category/category.service';
import { CategoryStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { ProductsService } from './services/product/products.service';
import { CartStoreItem } from './services/cart/cart.storeItem';
import { SearchKeywordType } from './types/searchKeywordtype';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, CatnavigationComponent, SidenavigationComponent, RouterOutlet],
  providers: [CategoryService, CategoryStoreItem, ProductsService, ProductsStoreItem, CartStoreItem],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly hideCategorySidebar$: Observable<boolean>;

  constructor(
    private categoriesStoreItem: CategoryStoreItem,
    private productStoreItem: ProductsStoreItem,
    private router: Router,
  ) {
    this.hideCategorySidebar$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => /^\/home\/(?:products\/[^/?#]+|cart)(?:[/?#]|$)/.test(this.router.url)),
    );
    this.categoriesStoreItem.loadCategories();
    this.productStoreItem.loadProducts();
  }

  onSelectSubCategory(subCategoryId: number): void {
    this.productStoreItem.loadProducts('subcategoryid=' + subCategoryId);
  }

  onSelectProductFor(productFor: string | null): void {
    if (productFor === null) {
      this.productStoreItem.loadProducts();
      return;
    }

    this.productStoreItem.loadProducts(
      'productFor=' + encodeURIComponent(productFor)
    );
  }

  onSearchKeyword(searchKeyword: SearchKeywordType): void {
    const query = new URLSearchParams();
    if (searchKeyword.categoryId !== null) {
      query.set('mainCategoryId', String(searchKeyword.categoryId));
    }
    if (searchKeyword.keyword?.trim()) {
      query.set('keyword', searchKeyword.keyword.trim());
    }

    this.productStoreItem.loadProducts(query.toString() || undefined);
  }

}