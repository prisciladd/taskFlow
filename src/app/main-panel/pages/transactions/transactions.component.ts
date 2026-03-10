import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ListTransactionsComponent } from "./component/list-transactions/list-transactions.component";

@Component({
  selector: 'app-transactions',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    ListTransactionsComponent
],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  /* private readonly router = inject(Router);

  id?: string;
  /* page$ = this.routerService.getTransactionPage(); 
  pagesEnum = TransactionsPagesEnum;

  handleEditTransaction(id: string): void {
    this.id = id;
    this.router.navigate([TransactionsPagesEnum.EDIT]); 
  }*/
}
