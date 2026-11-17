import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        loadComponent: () => import('./home/components/products/products.component').then((c) => c.ProductsComponent),
      },
      {
        path: 'products/:id',
        data: { hideCategorySidebar: true },
        loadComponent: () =>
          import('./home/components/productdetails/productdetails.component').then(
            (c) => c.ProductdetailsComponent,
          ),
      },
      {
        path: 'cart',
        data: { hideCategorySidebar: true },
        loadComponent: () =>
          import('./home/components/cart/cart/cart.component').then(
            (c) => c.CartComponent,
          ),
      },
      {
        path: 'signup',
        data: { hideCategorySidebar: true },
        loadComponent: () =>
          import('./home/users/user-signup/user-signup.component').then(
            (c) => c.UserSignupComponent,
          ),
      },
      {
        path: 'login',
        data: { hideCategorySidebar: true },
        loadComponent: () =>
          import('./home/components/users/user-login/user-login.component').then(
            (c) => c.UserLoginComponent,
          ),
      },
    ],
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
