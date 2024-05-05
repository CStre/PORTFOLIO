import { inject } from '@angular/core';
import { Router } from '@angular/router';
import AuthService from './auth.service';

export const authGuard = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isAuth = authService.isLoggedIn();
  if (!isAuth) router.navigate(['/']);
  return isAuth;
}
