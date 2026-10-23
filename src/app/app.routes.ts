import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { CatnavigationComponent } from './catnavigation/catnavigation.component';

export const routes: Routes = [
  { path: 'not-found', component: NotfoundComponent },
  { path: 'catnavigation', component: CatnavigationComponent },
  { path: '**', redirectTo: 'not-found' },
];
