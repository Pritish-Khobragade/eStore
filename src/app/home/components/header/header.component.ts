import { CategoryStoreItem } from '../../services/category/categories.storeItem';
import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faMagnifyingGlass,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { SearchKeywordType } from '../../types/searchKeywordtype';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, NgForOf, NgIf, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faUserCircle = faUserCircle;
  readonly faCartShopping = faCartShopping;

  @Output()
  searchClicked = new EventEmitter<SearchKeywordType>();

  displaySearch: boolean;

  constructor(public categoryStore: CategoryStoreItem, private router: Router) {
    this.displaySearch = router.url === '/home/products';
    router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.displaySearch = event.urlAfterRedirects === '/home/products';
    });
  }

  onClickSearch(event: SubmitEvent, keyword: string, categoryId: string): void {
    event.preventDefault();
    const parsedCategoryId = Number(categoryId);
    this.searchClicked.emit({
      keyword: keyword.trim(),
      categoryId: categoryId && Number.isInteger(parsedCategoryId) ? parsedCategoryId : null
    });
  }
}
