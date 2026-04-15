import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs';
import { DeleteConfirmationComponent } from '../../../../../delete-confirmation/delete-confirmation.component';
import { NegativeValuesPipe } from '../../../../../shared/pipes/negative-values.pipe';
import { Transaction } from '../../../dashboard/models/transaction.model';
import { TransactionsService } from '../../services/transactions.service';
import { CreateTransactionsComponent } from '../create-transactions/create-transactions.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DashboardService } from '../../../dashboard/services/dashboard.service';

@Component({
  selector: 'app-list-transactions',
  imports: [DatePipe, CurrencyPipe, NegativeValuesPipe, RouterModule],
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css',
})
export class ListTransactionsComponent implements OnInit {
  private readonly transactionService = inject(TransactionsService);
  private readonly router = inject(Router);
  private readonly dashboardService = inject(DashboardService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);

  accountBalance = 0;

  @Output() editEmitter = new EventEmitter<string>();

  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.loadTransactions();

    this.dashboardService
      .getAccountData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((account) => {
        this.accountBalance = account?.balance || 0;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log('Resultado não deu undefined');
      }
    });
  }

  loadTransactions(): void {
    this.transactionService.readTransaction().subscribe({
      next: (res) => {
        this.transactions.set(res);
        console.log('Carregando Transações ... ', res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openCreateTransactionDialog(): void {
    this.dialog
      .open(CreateTransactionsComponent, {
        width: '420px',
      })
      .afterClosed()
      .pipe(first())
      .subscribe((result) => {
        if (result) {
          this.loadTransactions();
        }
      });
  }

  onEdit(id: string): void {
    this.router.navigate([`transacoes/editar/${id}`]);
  }

  onDelete(id: string): void {
    const transactionToDelete = this.transactions().find(
      (item) => item.id === id
    );
    if (!transactionToDelete) {
      return;
    }

    this.dialog
      .open(DeleteConfirmationComponent, {
        width: '420px',

        data: {
          description: transactionToDelete.description,
          id: transactionToDelete.id,
        },
      })
      .afterClosed()
      .pipe(first())
      .subscribe((confirmed) => {
        if (confirmed) {
          this.loadTransactions();
        }
      });
  }
}
