import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { CategoryService } from './../../services/category.service';
import { Category } from '../../types/category.type';

@Component({
  selector: 'app-sidenavigation',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './sidenavigation.component.html',
  styleUrl: './sidenavigation.component.scss'
})
export class SidenavigationComponent {
  Categories: Category[] = [];
  categoryLoadError = false;

  constructor(private categoryService: CategoryService) {
    categoryService.getAllCategories().subscribe((Categories) => {
      this.Categories = Categories;
    }, () => {
      this.categoryLoadError = true;
    })
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.Categories.filter(category => parentCategoryId ? category.parent_category_id === parentCategoryId :
      category.parent_category_id === null)
  }
}
