import { Component, OnDestroy } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Subscription } from 'rxjs';
import { Category } from '../../types/category.type';
import { CategoryStoreItem } from '../../services/categories.storeItem';

@Component({
  selector: 'app-sidenavigation',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.scss'
})
export class SidenavigationComponent implements OnDestroy {
  Categories: Category[] = [];
  Subscription: Subscription = new Subscription();

  constructor(private categoryStore: CategoryStoreItem) {
    this.Subscription = categoryStore.Categories$.subscribe(categories => {
      this.Categories = categories;
    });
  }

  getCategories(parentCategoryId?: number | null): Category[] {
    return this.Categories.filter(category => {
      if (parentCategoryId === undefined || parentCategoryId === null) {
        return category.parent_category_id === null || category.parent_category_id === undefined;
      }

      return category.parent_category_id === parentCategoryId;
    });
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }
}
