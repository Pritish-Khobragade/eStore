import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, Observable, startWith } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { CategoryService } from './services/category/category.service';
import { CategoryStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { ProductsService } from './services/product/products.service';
import { SearchKeywordType } from './types/searchKeywordtype';
import { UserService } from './components/users/services/user-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, HeaderComponent, CatnavigationComponent, SidenavigationComponent, RouterOutlet],
  providers: [CategoryService, CategoryStoreItem, ProductsService, ProductsStoreItem],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly hideCategorySidebar$: Observable<boolean>;

  constructor(
    private categoriesStoreItem: CategoryStoreItem,
    private productStoreItem: ProductsStoreItem,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.hideCategorySidebar$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let route = this.activatedRoute.snapshot;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.pathFromRoot.some(
          (snapshot) => snapshot.data['hideCategorySidebar'] === true,
        );
      }),
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