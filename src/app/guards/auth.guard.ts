import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Logged in: allow (but not the auth page)
 * 
 * Not logged in: direct to auth page
 */
export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = await authService.isLoggedIn();
  const onAuthPage = route.routeConfig?.path === 'auth';

  if (isLoggedIn) {
    if (onAuthPage) {
      return router.createUrlTree(['/']);
    }
    return true;
  }

  if (!onAuthPage) {
    return router.createUrlTree(['/auth']);
  }

  return true;
};
