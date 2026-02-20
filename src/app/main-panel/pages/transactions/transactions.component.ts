import { Component } from '@angular/core';
import { CreateTransactionsComponent } from "./component/create-transactions/create-transactions.component";
import { ListTransactionsComponent } from "./component/list-transactions/list-transactions.component";

@Component({
  selector: 'app-transactions',
  imports: [CreateTransactionsComponent, ListTransactionsComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent{
  
  showCreateForm = false;

  redirectToCreate(): void {
    this.showCreateForm = !this.showCreateForm;
  }

}