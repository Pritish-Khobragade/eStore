import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { CatnavigationComponent } from './components/catnavigation/catnavigation.component';
import { SidenavigationComponent } from './components/sidenavigation/sidenavigation.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryService } from './services/category.service';
import { CategoryStoreItem } from './services/categories.storeItem';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CatnavigationComponent, SidenavigationComponent, ProductsComponent],
  providers: [CategoryService,CategoryStoreItem],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private categoriesStoreItem: CategoryStoreItem) {
    this.categoriesStoreItem.loadCategories();
  }
}
