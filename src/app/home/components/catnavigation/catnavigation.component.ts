import { CategoryStoreItem } from '../../services/category/categories.storeItem';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [AsyncPipe, NgForOf],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss'
})
export class CatnavigationComponent {

  constructor(public CategoryStore: CategoryStoreItem) {}

  @Output() productForSelected = new EventEmitter<string | null>();

  selectProductFor(productFor: string | null): void {
    this.productForSelected.emit(productFor);
  }

}