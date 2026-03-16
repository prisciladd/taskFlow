import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, inject,signal } from '@angular/core';
import { AccountStore } from '../dashboard/services/account.store';
import { LoanSimulatorComponent } from "./components/loan-simulator/loan-simulator.component";

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [CommonModule, LoanSimulatorComponent],
  providers: [CurrencyPipe, DecimalPipe],
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent {
 
  private readonly accountStore = inject(AccountStore);

  // Exibir saldo no template com async pipe
  balance$ = this.accountStore.balance$;

  loanLimit = signal(30000);
}
