import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs';
import { DeleteConfirmationComponent } from '../../../../../delete-confirmation/delete-confirmation.component';
import { NegativeValuesPipe } from '../../../../../shared/pipes/negative-values.pipe';
import { Transaction } from '../../../dashboard/models/transaction.model';
import { TransactionsService } from '../../services/transactions.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-transactions',
  imports: [DatePipe, CurrencyPipe, NegativeValuesPipe, RouterModule],
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css',
})
export class ListTransactionsComponent {
  private transactionService = inject(TransactionsService);
  private readonly router = inject(Router);

  @Output() editEmitter = new EventEmitter<string>();

  transactions = toSignal(this.transactionService.readTransaction(), {
    initialValue: [] as Transaction[],
  });
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log('Resultado não deu undefined');
      }
    });
  }

  redirectToCreate(): void {
    this.router.navigate(['transacoes/criar']);
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
