import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { CategoryStoreItem } from './services/category/categories.storeItem';
import { CategoryService } from './services/category/category.service';
import { ProductsService } from './services/product/products.service';

@NgModule({
  imports: [
    CommonModule,
    HomeComponent,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
