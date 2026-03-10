import { Routes } from '@angular/router';
import { DashboardComponent } from './main-panel/pages/dashboard/dashboard.component';
import { TransfersComponent } from './main-panel/pages/transfers/transfers.component';
import { LoanComponent } from './main-panel/pages/loan/loan.component';
import { TransactionsComponent } from './main-panel/pages/transactions/transactions.component';
import { CreateTransactionsComponent } from './main-panel/pages/transactions/component/create-transactions/create-transactions.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transferencia', component: TransfersComponent },
  { path: 'emprestimo', component: LoanComponent },
  { path: 'transacoes', component: TransactionsComponent },
  { path: 'transacoes/criar', component: CreateTransactionsComponent },
  { path: 'transacoes/editar/:id', component: CreateTransactionsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
