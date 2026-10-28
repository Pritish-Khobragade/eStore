import { CategoryStoreItem } from './../../services/categories.storeItem';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-catnavigation',
  standalone: true,
  imports: [AsyncPipe, NgForOf],
  templateUrl: './catnavigation.component.html',
  styleUrl: './catnavigation.component.scss'
})
export class CatnavigationComponent {

  constructor(public CategoryStore: CategoryStoreItem) {}
}
 