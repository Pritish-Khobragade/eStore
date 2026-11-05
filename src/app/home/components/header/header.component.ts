import { CategoryStoreItem } from '../../services/category/categories.storeItem';
import { Component , EventEmitter,Output } from '@angular/core';
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

  seartchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>();
  constructor(public categoryStore: CategoryStoreItem){

  }

}
