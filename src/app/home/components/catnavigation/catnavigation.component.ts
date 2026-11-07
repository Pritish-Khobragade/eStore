import { CategoryStoreItem } from '../../services/category/categories.storeItem';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf, RouterLink],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss'
})
export class CatnavigationComponent {

  constructor(public CategoryStore: CategoryStoreItem, private router: Router) {
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.displayOptions = (event as NavigationEnd).url !== '/home/products' ? false : true;
    });
  }

  @Output() productForSelected = new EventEmitter<string | null>();

  displayOptions: boolean = true;

  selectProductFor(productFor: string | null): void {
    this.productForSelected.emit(productFor);
  }

}