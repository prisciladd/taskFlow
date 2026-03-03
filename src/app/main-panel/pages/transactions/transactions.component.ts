import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CreateTransactionsComponent } from "./component/create-transactions/create-transactions.component";
import { ListTransactionsComponent } from "./component/list-transactions/list-transactions.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterService } from '../../../core/services/router.service';
import { TransactionsPagesEnum } from './constants/transaction-pages.enum';

@Component({
  selector: 'app-transactions',
  imports: [CreateTransactionsComponent, ListTransactionsComponent, MatButtonModule, MatDividerModule, MatIconModule, AsyncPipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent{
  private readonly routerService = inject(RouterService);

  id?:string;
  page$ = this.routerService.getTransactionPage();
  pagesEnum = TransactionsPagesEnum;

  handleEditTransaction(id:string):void{
    this.id=id;
    this.routerService.setTransactionPage(TransactionsPagesEnum.EDIT);
    
  }
}