import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly TOKEN_KEY = 'taskflow_token';

  readonly isAuthenticated = signal<boolean>(this.hasValidSession());

  constructor(private readonly router: Router) {}

  login(email: string, password: string): boolean {
    if (email === 'admin@banco.com' && password === 'admin123') {
      const fakeJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.falso-payload.falsa-assinatura';
      this.setSession(fakeJwt);
      this.router.navigate(['/home']);
      return true;
    } else {
      this.clearSession();
      console.log(
        `Login falhou: email ou senha inválidos. Email: ${email}, Senha: ${password}`,
      );

      return false;
    }
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  hasValidSession(): boolean {
    return !!this.getToken();
  }

  private setSession(token: string): void {
    localStorage.setItem(AuthService.TOKEN_KEY, token);
    this.isAuthenticated.set(true);
  }

  private clearSession(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    this.isAuthenticated.set(false);
  }
}
