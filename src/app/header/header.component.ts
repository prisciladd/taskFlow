import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Account } from '../main-panel/pages/dashboard/models/account.model';
import { first } from 'rxjs';
import { AccountStore } from '../main-panel/pages/loan/services/account.store';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private readonly accountService = inject(AccountStore);

  account?: Account;

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(): void {
    this.accountService
      .getAccount()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.account = res;
        },
        error: (err) => {
          console.log('Erro ao buscar dados da conta na api', err);
        },
      });
  }
}
