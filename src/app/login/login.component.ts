import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private readonly router: Router) {}

  errorMessage = signal<string | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    if (this.authService.hasValidSession()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage.set('Preencha email e senha para continuar.');
      return;
    }

    this.errorMessage.set(null);

    const loginSuccess = this.authService.login(
      this.loginForm.getRawValue().email,
      this.loginForm.getRawValue().password,
    );

    if (loginSuccess) {
      console.log('Autorizado navegar para dashboard');
      return;
    }

    this.errorMessage.set('Email ou senha inválidos. Tente novamente.');
    console.log('Email ou senha inválidos');
  }
}
