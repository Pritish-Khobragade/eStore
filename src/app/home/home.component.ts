import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryService } from './services/category/category.service';
import { CategoryStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { ProductsService } from './services/product/products.service';
import { SearchKeywordType } from './types/searchKeywordtype';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CatnavigationComponent, SidenavigationComponent, ProductsComponent],
  providers: [CategoryService, CategoryStoreItem, ProductsService, ProductsStoreItem],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private categoriesStoreItem: CategoryStoreItem, private productStoreItem: ProductsStoreItem) {
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