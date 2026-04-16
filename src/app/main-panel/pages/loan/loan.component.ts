import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { LoanSimulatorComponent } from './components/loan-simulator/loan-simulator.component';
import { toSignal } from '@angular/core/rxjs-interop';

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

  account = toSignal(this.dashboardService.getAccountData(), {
    initialValue: null,
  });
  // Exibir saldo no template com async pipe
  

  loanLimit = signal(30000);
}
