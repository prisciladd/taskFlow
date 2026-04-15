import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { first } from 'rxjs';
import { DashboardService } from './services/dashboard.service';
import { TransactionsService } from '../transactions/services/transactions.service';
import { Transfer } from '../transfers/models/transfer.model';
import { TransfersService } from '../transfers/services/transfers.service';
import { CreditCardInvoiceComponent } from './components/credit-card-invoice/credit-card-invoice.component';
import { Transaction } from './models/transaction.model';
import { Account } from './models/account.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    MatCardContent,
    CurrencyPipe,
    CreditCardInvoiceComponent,
    AsyncPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly transactionService = inject(TransactionsService);
  private readonly transferService = inject(TransfersService);
  private readonly dashboardService = inject(DashboardService);

  account = toSignal(this.dashboardService.getAccountData(), {
    initialValue: null,
  });

  totalReceita: number = 0;
  totalDespesa: number = 0;
  saldoPeriodo: number = 0;
  
  balanceAtual: number = 0;
  transaction?: Transaction[];
  transactions: Transaction[] = [];
  transfers?: Transfer;
  isBalanceVisible = signal(true);

  ngOnInit(): void {
    this.getTransactions();
  }

  constructor() {
    effect(() => {
      console.log('Mudou para', this.isBalanceVisible());
    });
  }

  toggleBalance(): void {
    this.isBalanceVisible.update((visible) => !visible);
  }

  getTransactions(): void {
    this.transactionService
      .readTransaction()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.transaction = res;
        },
        error: (err) => {
          console.log('Erro ao buscar dados da transação na api', err);
        },
      });
  }

  getTransfer(): void {
    this.transferService
      .readTransfers()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.transfers = res;
        },
        error: (err) => {
          console.log('Erro ao buscar dados da transferência na api', err);
        },
      });
  }
}
