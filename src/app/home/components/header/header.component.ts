import { PastOrder } from './../../types/order.type';
import { CategoryStoreItem } from '../../services/category/categories.storeItem';
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faMagnifyingGlass,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { SearchKeywordType } from '../../types/searchKeywordtype';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { UserService } from '../users/services/user-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, NgForOf, NgIf, AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faUserCircle = faUserCircle;
  readonly faCartShopping = faCartShopping;
  private readonly subscription = new Subscription();

  @Output()
  searchClicked = new EventEmitter<SearchKeywordType>();

  displaySearch: boolean = true;
  isUserAuthenticated: boolean = false;
  isUserMenuOpen: boolean = false;
  userName: string = '';

  constructor(public categoryStore: CategoryStoreItem, private router: Router, public cartStore: CartStoreItem, public UserService: UserService) {
    this.displaySearch = router.url === '/home/products';
    router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.displaySearch = event.urlAfterRedirects === '/home/products';
    });

    this.subscription.add(this.UserService.isUserAuthenticated$.subscribe((result)=>{
      this.isUserAuthenticated = result;
    }));

    this.subscription.add(
      this.UserService.loggedInUser$.subscribe((result)=>{
        this.userName = result.firstName ?? '';
            })
    );

  }

  onClickSearch(event: SubmitEvent, keyword: string, categoryId: string): void {
    event.preventDefault();
    const parsedCategoryId = Number(categoryId);
    this.searchClicked.emit({
      keyword: keyword.trim(),
      categoryId: categoryId && Number.isInteger(parsedCategoryId) ? parsedCategoryId : null
    });
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onLogout(): void {
    this.isUserMenuOpen = false;
    this.UserService.logout();
    this.router.navigateByUrl('/home/products');
  }

  pastOrders(): void {
    this.isUserMenuOpen = false;
    this.router.navigate(['home/pastorders']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
