import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../login/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasValidSession()) {
    console.log(`Acesso permitido para a rota: ${state.url}`);

    return true;
  } else {
    console.log(
      `Acesso negado para a rota: ${state.url}. Redirecionando para /login.`,
    );

    return router.createUrlTree(['/login']);
  }
};
