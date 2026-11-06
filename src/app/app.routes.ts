import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./home/notfound/notfound.component').then((c) => c.NotfoundComponent),
  },
  {
    path: 'catnavigation',
    loadComponent: () => import('./home/components/catnavigation/catnavigation.component').then((c) => c.CatnavigationComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'not-found' },
];
