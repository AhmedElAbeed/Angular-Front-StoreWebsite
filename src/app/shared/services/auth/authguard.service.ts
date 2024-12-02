// src/app/shared/services/auth/auth.guard.ts
import { inject } from '@angular/core';
import { Router, RouterStateSnapshot, CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service'; // Make sure to import AuthService

export const canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Check if the user is logged in from localStorage and cookies
  if (authService.isLoggedIn()) {
    const userRole = localStorage.getItem('role'); // Fetch role directly from localStorage

    // Allow access only if the user's role is 'admin'
    if (userRole === 'admin') {
      return true;
    } else {
      // Redirect non-admin users to the home page or another page
      router.navigate(['/']);
      return false;
    }
  } else {
    // Redirect unauthenticated users to the login page
    router.navigate(['/login']);
    return false;
  }
};
