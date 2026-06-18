import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../../services/authService/auth";

export const AuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.getIsUserAuthenticated();

  if (isAuth) {
    return true;
  }

  return router.createUrlTree(['/auth/login']);
};