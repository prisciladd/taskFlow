import { Component, EventEmitter, inject, model, OnInit, Output, signal } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../../dashboard/models/transaction.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NegativeValuesPipe } from '../../../../../shared/pipes/negative-values.pipe';
import { RouterService } from '../../../../../core/services/router.service';
import { TransactionsPagesEnum } from '../../constants/transaction-pages.enum';
import { first } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../../../../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-list-transactions',
  imports: [DatePipe, CurrencyPipe, NegativeValuesPipe],
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css'
})
export class ListTransactionsComponent implements OnInit{

  private readonly transactionService = inject(TransactionsService);
  private readonly routerService = inject(RouterService);
  
  @Output() editEmitter = new EventEmitter<string>()

  transactions?:Transaction[];
  readonly dialog = inject(MatDialog);


  /* showCreateForm = false; */
  
  ngOnInit(): void {
    this.getTransactions();
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
     /*  data: {name: this.name(), animal: this.animal()}, */
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        /* this.animal.set(result); */
      }
    });
  }


  getTransactions():void{
    this.transactionService.readTransaction().pipe(first()).subscribe({
      next: (res) => {
        this.transactions = res;
      },
      error: (err) => {
        console.log("Erro ao buscar dados das transações na api",err);
      },    
   });
  }

  redirectToCreate(): void {
    /* this.showCreateForm = !this.showCreateForm; */
    this.routerService.setTransactionPage(TransactionsPagesEnum.CREATE);
  }

  onEdit(id: string):void{
    this.editEmitter.emit(id);
  }

  onDelete(id: string):void{
    this.transactionService.deleteTransaction(id).pipe(first()).subscribe({
      next: () => {
        this.getTransactions();
      },
      error: (err) => {
        console.log("Erro ao deletar dados das transações na api",err);
      },    
   });
   
  }

  
}
