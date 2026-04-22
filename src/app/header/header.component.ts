import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Account } from '../main-panel/pages/dashboard/models/account.model';
import { first } from 'rxjs';
import { DashboardService } from '../main-panel/pages/dashboard/services/dashboard.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../login/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly translateService = inject(TranslateService);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);

  account?: Account;

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(): void {
    this.dashboardService
      .getAccountData()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.account = res;
        },
        error: (err) => {
          console.log('Erro ao buscar dados da conta na api', err);
          this.snackBar.open(
            err?.message || 'Nao foi possivel carregar dados da conta.',
            'OK',
            { duration: 4000 },
          );
        },
      });
  }

  mudarIdioma(idioma: string): void {
    this.translateService.use(idioma);
  }

  logout(): void {
    this.authService.logout();
  }
}
