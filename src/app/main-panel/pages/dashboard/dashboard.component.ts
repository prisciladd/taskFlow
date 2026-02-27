import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DashboardService } from './services/dashboard.service';
import { Account } from './models/account.model';
import { TransactionsService } from '../transactions/services/transactions.service';
import { Transaction } from './models/transaction.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [MatCard, MatCardContent, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  private readonly dashbordService = inject(DashboardService);
  private readonly transactionService = inject(TransactionsService);
  totalReceita: number = 0;
  totalDespesa: number = 0;
  saldoPeriodo: number = 0;

  acount?: Account;
  transaction?:Transaction[];

  ngOnInit(): void {
    this.getAccount();
    this.getTransactions();
  }

  getAccount():void{
       this.dashbordService.getAccount().pipe(first()).subscribe({
    next: (res) => {
        this.acount = res;
        
    },
    error: (err) => {
      console.log("Erro ao buscar dados da conta na api",err);
      
    },
    
   });
  };

  getTransactions():void{
     this.transactionService.getTransaction().pipe(first()).subscribe({
    next: (res) =>{
      this.transaction = res;

      this.transaction.forEach((item) => {
        if(item.type == "income"){
          this.totalReceita += item.amount
          /* this.transaction.reduce((acc,item) => acc + Number(item.amount),0); */
        }else{
          this.totalDespesa += item.amount
        }
        this.saldoPeriodo = this.totalReceita - this.totalDespesa
      });
         
    },
    error: (err) =>{
      console.log("Erro ao buscar dados da transação na api",err);
    }
   })
  };

}
