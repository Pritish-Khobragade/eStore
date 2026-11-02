import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StoreItem } from '../../../shared/storeItems';
import { Category } from '../../types/category.type';
import { CategoryService } from './category.service';

@Injectable()
export class CategoryStoreItem extends StoreItem<Category[]> {
  constructor(private categoryService: CategoryService) {
    super([]);
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.setValue(categories);
    });
  }

  get Categories$(): Observable<Category[]> {
    return this.value$;
  }

  get topLevelCategories$(): Observable<Category[]> {
    return this.value$.pipe(
      map(categories =>
        categories.filter(category => category.parent_category_id === null)
      )
    );
  }
}
