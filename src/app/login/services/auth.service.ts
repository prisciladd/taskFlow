import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAutheticated = signal<boolean>(this.hasToken());

  constructor(private readonly router: Router) {}

  login(email: string, password: string): boolean {
    if (email === 'admin@banco.com' && password === 'admin123') {
      const fakeJwt =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.falso-payload.falsa-assinatura';
      localStorage.setItem('token', fakeJwt);
      this.isAutheticated.set(true);
      this.router.navigate(['/home/dashboard']);
      return true;
    }else{
      console.log(`Login falhou: email ou senha inválidos.,Email: ${email}, Senha: ${password}`);
      
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
