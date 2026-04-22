import { CurrencyPipe } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCard, MatCardContent } from '@angular/material/card';
import { first } from 'rxjs';
import { TransactionsService } from '../transactions/services/transactions.service';
import { Transfer } from '../transfers/models/transfer.model';
import { TransfersService } from '../transfers/services/transfers.service';
import { CreditCardInvoiceComponent } from './components/credit-card-invoice/credit-card-invoice.component';
import { Transaction } from './models/transaction.model';
import { DashboardService } from './services/dashboard.service';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    MatCardContent,
    CurrencyPipe,
    CreditCardInvoiceComponent,
    RouterModule,
    MatIcon,
    MatButtonModule,
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly transactionService = inject(TransactionsService);
  private readonly transferService = inject(TransfersService);
  private readonly dashboardService = inject(DashboardService);
  private readonly snackBar = inject(MatSnackBar);

  account = toSignal(this.dashboardService.getAccountData(), {
    initialValue: null,
  });

  totalReceita: number = 0;
  totalDespesa: number = 0;
  saldoPeriodo: number = 0;

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

  calculateCurrentMonthIncome(transactions: Transaction[]): number {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.date);
      const isCurrentMonth =
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear;
      const isIncome = transaction.amount > 0;

      if (!isCurrentMonth || !isIncome) {
        return total;
      }

      return total + transaction.amount;
    }, 0);
  }

  getTransactions(): void {
    this.transactionService
      .readTransaction()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.transaction = res;
          this.transactions = res;
          this.totalReceita = this.calculateCurrentMonthIncome(res);
        },
        error: (err) => {
          console.log('Erro ao buscar dados da transação na api', err);
          this.snackBar.open(
            err?.message || 'Nao foi possivel carregar as transacoes.',
            'OK',
            { duration: 4000 },
          );
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
          this.snackBar.open(
            err?.message || 'Nao foi possivel carregar as transferencias.',
            'OK',
            { duration: 4000 },
          );
        },
      });
  }
}
