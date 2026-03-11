import { Component, inject, OnInit,signal,effect } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DashboardService } from './services/dashboard.service';
import { Account } from './models/account.model';
import { TransactionsService } from '../transactions/services/transactions.service';
import { Transaction } from './models/transaction.model';
import { first } from 'rxjs';
import { Transfer } from '../transfers/models/transfer.model';
import { TransfersService } from '../transfers/services/transfers.service';
import { AccountStore } from '../loan/services/account.store';
import { AsyncPipe } from '@angular/common';

import { CreditCardInvoiceComponent } from "./components/credit-card-invoice/credit-card-invoice.component";

@Component({
  selector: 'app-dashboard',
  imports: [MatCard, MatCardContent, CurrencyPipe, AsyncPipe, CreditCardInvoiceComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private readonly dashbordService = inject(DashboardService);
  private readonly transactionService = inject(TransactionsService);
  private readonly transferService = inject(TransfersService);
  private readonly accountStore = inject(AccountStore);

  totalReceita: number = 0;
  totalDespesa: number = 0;
  saldoPeriodo: number = 0;
  balance$ = this.accountStore.balance$;
  acount?: Account;
  transaction?: Transaction[];
  transactions: Transaction[] = [];
  transfers?: Transfer;
  isBalanceVisible=signal(true)

  ngOnInit(): void {
    this.getAccount();
    this.getTransactions();
  }
  
  constructor(){

    effect(() =>{
      console.log("Mudou para",this.isBalanceVisible());
      
    });
  }

  toggleBalance():void{
    this.isBalanceVisible.update((visible) => !visible)
  }

  getAccount(): void {
    this.dashbordService
      .getAccount()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.acount = res;
        },
        error: (err) => {
          console.log('Erro ao buscar dados da conta na api', err);
        },
      });
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
    this.transferService.readTransfers()
      
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

  calcBalance(): void {
    this.transactions.forEach((item) => {
      if (item.type == 'income') {
        this.totalReceita += item.amount;
        /* this.transaction.reduce((acc,item) => acc + Number(item.amount),0); */
      }
      if (item.type == 'expense') {
        this.totalDespesa += item.amount;
      }
      if (item.type == 'transfer') {
        /* this.acount?.balance -= this.transfers?.amount */
      }
      this.saldoPeriodo = this.totalReceita - this.totalDespesa;
    });
  }
}
