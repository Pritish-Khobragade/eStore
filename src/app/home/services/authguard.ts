import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserService } from '../components/users/services/user-service.service';

export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isUserAuthenticated) {
    return true;
  }

  return router.createUrlTree(['/home/login'], {
    queryParams: { returnUrl: state.url }
  });
};