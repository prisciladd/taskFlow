import { Routes } from '@angular/router';
import { DashboardComponent } from './main-panel/pages/dashboard/dashboard.component';
import { TransfersComponent } from './main-panel/pages/transfers/transfers.component';
import { LoanComponent } from './main-panel/pages/loan/loan.component';
import { TransactionsComponent } from './main-panel/pages/transactions/transactions.component';
import { CreateTransactionsComponent } from './main-panel/pages/transactions/component/create-transactions/create-transactions.component';
import { NotFoundComponent } from './main-panel/pages/not-found/not-found.component';
import { ProfileComponent } from './main-panel/pages/profile/profile.component';
import { PersonalDataComponent } from './main-panel/pages/profile/pages/personal-data/personal-data.component';
import { SecurityDataComponent } from './main-panel/pages/profile/pages/security-data/security-data.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { MainPanelComponent } from './main-panel/main-panel.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainPanelComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'transferencia', component: TransfersComponent },
      { path: 'emprestimo', component: LoanComponent },
      { path: 'transacoes', component: TransactionsComponent },
      { path: 'transacoes/criar', component: CreateTransactionsComponent },
      { path: 'transacoes/editar/:id', component: CreateTransactionsComponent },
      {
        path: 'perfil',
        component: ProfileComponent,
        children: [
          { path: 'dados', component: PersonalDataComponent },
          { path: 'segurança', component: SecurityDataComponent },
          { path: '', redirectTo: 'dados', pathMatch: 'full' },
        ]
      }
    ],
  },  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
