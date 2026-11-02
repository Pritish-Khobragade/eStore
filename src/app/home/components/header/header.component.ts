import { CategoryStoreItem } from '../../services/category/categories.storeItem';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faHeart,
  faMagnifyingGlass,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { AsyncPipe, NgForOf } from '@angular/common';

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

  constructor(public categoryStore: CategoryStoreItem){

  }

}
