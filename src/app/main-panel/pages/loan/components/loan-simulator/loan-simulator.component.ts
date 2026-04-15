import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { first, map, startWith } from 'rxjs';
import { TransactionTypes } from '../../../../../constants/transactions-types.enum';
import { Transaction } from '../../../dashboard/models/transaction.model';
import { TransactionsService } from '../../../transactions/services/transactions.service';
import { LoanSimulationResult } from '../../models/loan.model';
import { DashboardService } from '../../../dashboard/services/dashboard.service';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan-simulator',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepicker,
    MatDatepickerModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrencyPipe, DecimalPipe, provideNativeDateAdapter()],
  templateUrl: './loan-simulator.component.html',
  styleUrl: './loan-simulator.component.scss',
})
export class LoanSimulatorComponent {
  private readonly loanService = inject(LoanService);
  private readonly fb: NonNullableFormBuilder = inject(FormBuilder).nonNullable;
  private readonly transactionService = inject(TransactionsService);
  private readonly dashboardService = inject(DashboardService);

  todayLocale = new Date().toLocaleDateString().split('/');
  todayISO = `${this.todayLocale[2]}-${this.todayLocale[1]}-${this.todayLocale[0]}`;
  transactionTypesEnum = TransactionTypes;
  loading = signal(false);
  apiError = signal<string | null>(null);
  balance$ = this.dashboardService.balance$;

  form = this.fb.group({
    amount: this.fb.control(3000, {
      validators: [Validators.required, Validators.min(100)],
    }),
    installments: this.fb.control(12, {
      validators: [Validators.required, Validators.min(2), Validators.max(72)],
    }),
    // taxa mensal em % no input (ex: “2.3”) -> convertida para decimal no cálculo
    monthlyRatePercent: this.fb.control(2.3, {
      validators: [Validators.required, Validators.min(0), Validators.max(20)],
    }),
    id: this.fb.control(''),
    date: this.fb.control(this.todayISO),
    description: this.fb.control(''),
    type: this.fb.control({
      value: this.transactionTypesEnum.LOAN,
      disabled: true,
    }),
  });

  // Resultado da simulação (Observável) derivado do formulário
  simulation$ = this.form.valueChanges.pipe(
    startWith(this.form.getRawValue()),
    map((v) => {
      const monthlyRate = (v.monthlyRatePercent ?? 0) / 100;
      return this.loanService.simulate({
        amount: v.amount ?? 0,
        installments: v.installments ?? 0,
        monthlyRate,
      });
    })
  );

  // Carrega taxa padrão da API na inicialização (se existir)
  constructor() {
    this.loanService.getDefaultMonthlyRate().subscribe({
      next: (rateDecimal) => {
        const percent = Math.round(rateDecimal * 10000) / 100; // 0.023 -> 2.3
        this.form.patchValue({ monthlyRatePercent: percent });
      },
      error: () => {
        // Se a API falhar, mantemos o valor default e mostramos aviso opcional
        this.apiError.set(
          'Não foi possível carregar taxa padrão. Use a taxa manualmente.'
        );
      },
    });
  }

  get f() {
    return this.form.controls;
  }
  get canSubmit() {
    return this.form.valid && !this.loading();
  }

  contratar(simulation: LoanSimulationResult) {
    if (!this.form.valid) return;

    const value = this.form.getRawValue();
    const payload = {
      amount: value.amount,
      installments: value.installments,
      monthlyRate: value.monthlyRatePercent / 100,
    };
    const payloadTransaction: Transaction = this.form.getRawValue();

    this.loading.set(true);
    this.apiError.set(null);

    this.loanService
      .submitLoan(payload)
      .pipe(first())
      .subscribe({
        next: (res) => {
          // 1) Credita o valor solicitado no saldo global
          this.dashboardService.credit(
            payload.amount,
            `Crédito de empréstimo #${res.id} (${payload.installments}x)`
          );
          // 2) Opcional: poderia agendar débitos mensais (fora do escopo)
        },
        error: (err) => {
          this.apiError.set(
            'Falha ao contratar o empréstimo. Tente novamente.'
          );
        },
        complete: () => {
          this.loading.set(false);
        },
      });

    this.transactionService
      .createTransaction(payloadTransaction)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('Empréstimo realizado!');
        },
        error: (err) => {
          console.log('Erro ao gravar dados do empréstimo na api', err);
        },
      });
  }

  onContratar() {
    if (!this.form.valid) return;

    const raw = this.form.getRawValue();
    const simulation = this.loanService.simulate({
      amount: raw.amount,
      installments: raw.installments,
      monthlyRate: raw.monthlyRatePercent / 100,
    });

    this.contratar(simulation); // usa o mesmo método que já existia
  }
}
