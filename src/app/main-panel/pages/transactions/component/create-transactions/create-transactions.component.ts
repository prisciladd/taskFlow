import { Component, inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TransactionTypes } from '../../../../../constants/transactions-types.enum';
import { TransactionsService } from '../../services/transactions.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNgxMask } from 'ngx-mask';
import { provideNativeDateAdapter } from '@angular/material/core';
import { first } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { Transaction } from '../../../dashboard/models/transaction.model';
import { RouterService } from '../../../../../core/services/router.service';
import { TransactionsPagesEnum } from '../../constants/transaction-pages.enum';

@Component({
  selector: 'app-create-transactions',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './create-transactions.component.html',
  styleUrl: './create-transactions.component.css',
  providers: [provideNgxMask(), provideNativeDateAdapter()],
})
export class CreateTransactionsComponent implements OnInit {
  form!: FormGroup;
  transactionTypesEnum = TransactionTypes;
  /* today = new Date ().toISOString().substring(0,10); */
  todayLocale = new Date().toLocaleDateString().split('/');
  todayISO = `${this.todayLocale[2]}-${this.todayLocale[1]}-${this.todayLocale[0]}`;
  private readonly transactionService = inject(TransactionsService);
  private readonly routerService = inject(RouterService);

  @Input() id?: string;

  ngOnInit(): void {
    this.buildForm();

    if (this.id) {
      this.getTransactionById();
    }
  }

  buildForm(): void {
    this.form = new FormGroup({
      date: new FormControl(
        this.todayISO /* [Validators.required, this.dateRangeValidator(new Date(2026,0,1), new Date())] */
      ),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      amount: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });
  }

  getTransactionById(): void {
    this.transactionService
      .readTransactionById(this.id!)
      .pipe(first())
      .subscribe({
        next: (transaction) => {
          this.form.patchValue(transaction);
        },
        error: (err) => {
          console.log('Erro ao buscar dados da transação por id na api', err);
        },
      });
  }

  onSubmit(): void {
    const payload: Transaction = this.form.getRawValue(); //getRawValue retorna valor de todos os campos até os bloqueado
    if (this.id) {
      this.updateTransaction(payload);
      return;
    }
    this.saveTransaction(payload);
  }

  dateRangeValidator(minDate: Date, maxDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const value = new Date(control.value);

      if (isNaN(value.getTime())) {
        return { invalidDate: true };
      }

      if (value <= minDate || value >= maxDate) {
        return {
          dateOutOfRange: {
            min: minDate,
            max: maxDate,
            actual: value,
          },
        };
      }

      return null;
    };
  }

  saveTransaction(payload: Transaction): void {
    this.transactionService
      .createTransaction(payload)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('Sucesso!');
          this.redirectToList();
        },
        error: (err) => {
          console.log('Erro ao gravar dados da transação na api', err);
        },
      });
  }

  updateTransaction(payload: Transaction): void {
    this.transactionService
      .updateTransaction(payload, this.id!)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('Sucesso!');
          this.redirectToList();
        },
        error: (err) => {
          console.log('Erro ao gravar dados da transação na api', err);
        },
      });
  }

  redirectToList(): void {
    /* this.showCreateForm = !this.showCreateForm; */
    this.routerService.setTransactionPage(TransactionsPagesEnum.LIST);
  }
}
