import { Component, inject, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../../dashboard/models/transaction.model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-transactions',
  imports: [MatTableModule,MatPaginatorModule,MatSortModule],
  templateUrl: './list-transactions.component.html',
  styleUrl: './list-transactions.component.css'
})
export class ListTransactionsComponent implements OnInit{

  private readonly transactionService = inject(TransactionsService)
  
  transactions?:Transaction[];

  displayedColumns: string[] = ['date', 'description', 'amount', 'type'];

  dataSource = new MatTableDataSource(this.transactions);
  
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
