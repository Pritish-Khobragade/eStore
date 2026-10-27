import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../types/category.type';

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss'
})
export class CatnavigationComponent {
  Categories: Category[] = [];

  constructor(categoriesService: CategoryService) {
    categoriesService.getAllCategories().subscribe(categories => {
      this.Categories = categories.filter(category => category.parent_category_id === null);
    });
  }
}
