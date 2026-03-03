import { Component } from '@angular/core';
import { CreateTransactionsComponent } from "./component/create-transactions/create-transactions.component";
import { ListTransactionsComponent } from "./component/list-transactions/list-transactions.component";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-transactions',
  imports: [CreateTransactionsComponent, ListTransactionsComponent, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent{
  
  showCreateForm = false;

  redirectToCreate(): void {
    this.showCreateForm = !this.showCreateForm;
  }

}