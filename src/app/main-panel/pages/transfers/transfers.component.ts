import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { concatMap, finalize, first } from 'rxjs';
import { TransactionTypes } from '../../../constants/transactions-types.enum';
import { Transfer } from './models/transfer.model';
import { TransfersService } from './services/transfers.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { TransactionsService } from '../transactions/services/transactions.service';
import { Transaction } from '../dashboard/models/transaction.model';
import { DashboardService } from '../dashboard/services/dashboard.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-transfers',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css',
})
export class TransfersComponent implements OnInit {
  transactionTypesEnum = TransactionTypes;
  todayLocale = new Date().toLocaleDateString().split('/');
  todayISO = `${this.todayLocale[2]}-${this.todayLocale[1]}-${this.todayLocale[0]}`;
  isTransferring = signal(false);

  private readonly transferService = inject(TransfersService);
  private readonly transactionService = inject(TransactionsService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly dashboardService = inject(DashboardService);

  account = toSignal(this.dashboardService.getAccountData(), {
    initialValue: null,
  });

  ngOnInit(): void {
    this.buildForm();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 4000 });
  }
  form!: FormGroup;

  buildForm(): void {
    this.form = new FormGroup({
      account: new FormControl('', Validators.required),
      amount: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0.01),
      ]),
      date: new FormControl(this.todayISO, Validators.required),
      description: new FormControl('', Validators.required),
      type: new FormControl({
        value: this.transactionTypesEnum.TRANSFER,
        disabled: true,
      }),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.openSnackBar(
        'Preencha os campos obrigatorios da transferencia.',
        'OK',
      );
      return;
    }

    const accountData = this.account();
    if (!accountData) {
      this.openSnackBar('Nao foi possivel carregar o saldo da conta.', 'OK');
      return;
    }

    const rawValue = this.form.getRawValue();
    const amount = Number(rawValue.amount);

    if (Number.isNaN(amount) || amount <= 0) {
      this.openSnackBar(
        'Informe um valor de transferencia maior que zero.',
        'OK',
      );
      return;
    }

    if (amount > accountData.balance) {
      this.openSnackBar(
        'Saldo insuficiente para realizar a transferencia.',
        'OK',
      );
      return;
    }

    const payload: Transfer = {
      account: Number(rawValue.account),
      amount,
      date: rawValue.date,
      description: rawValue.description,
    };
    const newBalance = accountData.balance - amount;

    const payloadTransaction: Omit<Transaction, 'id'> = {
      date: rawValue.date,
      description: rawValue.description,
      amount: -Math.abs(amount),
      type: TransactionTypes.TRANSFER,
    };

    this.isTransferring.set(true);

    this.transferService
      .createTransfer(payload)
      .pipe(
        first(),
        concatMap(() =>
          this.dashboardService.updateBalance(newBalance).pipe(first()),
        ),
        concatMap(() =>
          this.transactionService
            .createTransaction(payloadTransaction)
            .pipe(first()),
        ),
        finalize(() => this.isTransferring.set(false)),
      )
      .subscribe({
        next: () => {
          this.openSnackBar('Transferência realizada!', 'OK');
          this.form.reset({
            account: '',
            amount: null,
            date: this.todayISO,
            description: '',
            type: this.transactionTypesEnum.TRANSFER,
          });
        },
        error: (err) => {
          console.log('Erro ao concluir fluxo da transferência na api', err);
          this.openSnackBar(
            err?.message || 'Nao foi possivel concluir a transferencia.',
            'OK',
          );
        },
      });
  }
}
