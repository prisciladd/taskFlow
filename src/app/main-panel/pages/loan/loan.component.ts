import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { LoanSimulatorComponent } from './components/loan-simulator/loan-simulator.component';

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [CommonModule, LoanSimulatorComponent],
  providers: [CurrencyPipe, DecimalPipe],
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
})
export class LoanComponent {
  private readonly dashboardService = inject(DashboardService);

  // Exibir saldo no template com async pipe
  balance$ = this.dashboardService.balance$;

  loanLimit = signal(30000);
}
