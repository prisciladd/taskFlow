import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardService } from '../main-panel/pages/dashboard/services/dashboard.service';
import { Account } from '../main-panel/pages/dashboard/models/account.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private readonly dashbordService = inject(DashboardService);

  acount?: Account;

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(): void {
    this.dashbordService
      .getAccount()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.acount = res;
        },
        error: (err) => {
          console.log('Erro ao buscar dados da conta na api', err);
        },
      });
  }
}
