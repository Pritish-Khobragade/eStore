import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { CatnavigationComponent } from './catnavigation/catnavigation.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'not-found', component: NotfoundComponent },
  { path: 'catnavigation', component: CatnavigationComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];
