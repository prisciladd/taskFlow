import { Component, inject, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../../dashboard/models/transaction.model';

@Component({
  selector: 'app-list-transactions',
  imports: [],
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css'
})
export class ListTransactionsComponent implements OnInit{

  private readonly transactionService = inject(TransactionsService)
  
  transactions?:Transaction[];


   ngOnInit(): void {
    this.transactionService.getTransaction().subscribe({
    next: (res) => {
      this.transactions = res;
      
    },
    error: (err) => {
      console.log("Erro ao buscar dados das transações na api",err);
    },
    
   });

    }
    
}
