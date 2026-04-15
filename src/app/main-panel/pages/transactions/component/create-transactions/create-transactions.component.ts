import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { provideNgxMask } from 'ngx-mask';
import { first } from 'rxjs';
import { TransactionTypes } from '../../../../../constants/transactions-types.enum';
import { Transaction } from '../../../dashboard/models/transaction.model';
import { TransactionsService } from '../../services/transactions.service';


@Component({
  selector: 'app-create-transactions',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule,
  ],
  templateUrl: './create-transactions.component.html',
  styleUrl: './create-transactions.component.css',
  providers: [provideNgxMask(), provideNativeDateAdapter()],
})
export class CreateTransactionsComponent {
  todayLocale = new Date().toLocaleDateString().split('/');
  todayISO = `${this.todayLocale[2]}-${this.todayLocale[1]}-${this.todayLocale[0]}`;
  private readonly transactionService = inject(TransactionsService);
  readonly data = inject(MAT_DIALOG_DATA, { optional: true });
  readonly id = this.data?.id;
  
  private readonly dialogRef = inject(
    MatDialogRef<CreateTransactionsComponent>,
  );

  transactionForm = new FormGroup({
    date: new FormControl(new Date().toISOString().split('T')[0], {
      validators: [Validators.required],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
      nonNullable: true,
    }),
    amount: new FormControl(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    type: new FormControl<TransactionTypes | null>(null, {
      validators: [Validators.required],
    }),
  });

  transactionTypesEnum = TransactionTypes;

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  onSubmit(): void {
    if (this.transactionForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      const formValue = this.transactionForm.getRawValue();
      const payload: Omit<Transaction, 'id'> = {
        ...formValue, //spread operator pega o valor do formvalue e tras aqui para baixo

        date: formValue.date,
        description: formValue.description,
        amount:
          formValue.type === TransactionTypes.EXPENSE
            ? -Math.abs(formValue.amount)
            : Math.abs(formValue.amount),

        type: formValue.type!,
      };

      this.transactionService
        .createTransaction(payload)
        .pipe(first())
        .subscribe({
          next: () => {
            alert('Transação criada com sucesso!');
            this.transactionForm.reset();
            this.dialogRef.close(true); // fecha o modal e indica sucesso
          },
          error: (err) => {
            console.error('Erro ao criar transação', err);
            this.errorMessage.set(
              'Não foi possível criar a transação. Tente novamente.',
            );
          },
          complete: () => {
            this.isLoading.set(false);
          },
        });
    }
  }

  redirectToList() {
    this.dialogRef.close();
  }
}
