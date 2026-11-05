import { CategoryStoreItem } from '../../services/category/categories.storeItem';
import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { AsyncPipe, NgForOf } from '@angular/common';
import { SearchKeywordType } from '../../types/searchKeywordtype';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, NgForOf, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faUserCircle = faUserCircle;
  readonly faCartShopping = faCartShopping;

  @Output()
  searchClicked = new EventEmitter<SearchKeywordType>();

  constructor(public categoryStore: CategoryStoreItem) {}

  onClickSearch(event: SubmitEvent, keyword: string, categoryId: string): void {
    event.preventDefault();
    const parsedCategoryId = Number(categoryId);
    this.searchClicked.emit({
      keyword: keyword.trim(),
      categoryId: categoryId && Number.isInteger(parsedCategoryId) ? parsedCategoryId : null
    });
  }
}
