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

  constructor(private categoryService: CategoryService) {
    this.Categories = this.categoryService.getAllCategories();
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.Categories.filter(category => category.parent_category_id === parentCategoryId);
  }
}
