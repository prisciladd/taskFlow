import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
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
import { toSignal } from '@angular/core/rxjs-interop';
import { CreateTransactionsComponent } from '../create-transactions/create-transactions.component';

@Component({
  selector: 'app-list-transactions',
  imports: [DatePipe, CurrencyPipe, NegativeValuesPipe, RouterModule],
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css',
})
export class ListTransactionsComponent implements OnInit {
  private transactionService = inject(TransactionsService);
  private readonly router = inject(Router);

  @Output() editEmitter = new EventEmitter<string>();

  transactions = signal<Transaction[]>([]);
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadTransactions();
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openCreateTransactionDialog(): void {
    const dialogRef = this.dialog.open(CreateTransactionsComponent, {
      width: '420px',
    }).afterClosed().pipe(first()).subscribe((result) => {
      if(result){
        this.loadTransactions();
      }
    });
  }

  onEdit(id: string): void {
    console.log('estou no onEdit');

    this.router.navigate([`transacoes/editar/${id}`]);
  }

  onDelete(id: string): void {
    this.transactionService
      .deleteTransaction(id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.transactions();
        },
        error: (err) => {
          console.log('Erro ao deletar dados das transações na api', err);
        },
      });
  }
}
