
import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
export class LoginComponent {
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

  onSubmit() {
    if (
      !this.authService.login(
        this.loginForm.getRawValue().email,
        this.loginForm.getRawValue().password
      )
    ) {
      this.errorMessage.set('Email ou senha inválidos. Tente novamente.');
    }
  }
}
