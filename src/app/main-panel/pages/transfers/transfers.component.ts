import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { first } from 'rxjs';
import { TransactionTypes } from '../../../constants/transactions-types.enum';
import { Transfer } from './models/transfer.model';
import { TransfersService } from './services/transfers.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { TransactionsService } from '../transactions/services/transactions.service';
import { Transaction } from '../dashboard/models/transaction.model';
import { AccountStore } from '../loan/services/account.store';


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
    MatButtonModule
  ],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css',
})
export class TransfersComponent implements OnInit {
  transactionTypesEnum = TransactionTypes;
  todayLocale = new Date().toLocaleDateString().split('/');
  todayISO = `${this.todayLocale[2]}-${this.todayLocale[1]}-${this.todayLocale[0]}`;
  
  private readonly transferService = inject(TransfersService);
  private readonly transactionService = inject(TransactionsService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly accountStore = inject(AccountStore);

  ngOnInit(): void {
    this.buildForm();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  form!: FormGroup;

  buildForm(): void {
    this.form = new FormGroup({
      account: new FormControl(),
      amount: new FormControl(),
      date: new FormControl(this.todayISO),
      description: new FormControl(),
      type: new FormControl({value: this.transactionTypesEnum.TRANSFER, disabled: true})
    });
  }

  onSubmit(): void {
    console.log('enviado');
    const payload: Transfer = this.form.getRawValue();
    const payloadTransaction: Transaction = this.form.getRawValue();

    this.transferService
      .createTransfer(payload)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.accountStore.debit(
            payload.amount,`Débito de transferência #${res.id} (${payload.description}x)`,);

            this.openSnackBar('Transferência realizada!','OK');
          },
        error: (err) => {
          console.log('Erro ao gravar dados da transferência na api', err);
        },
      });

      this.transactionService
      .createTransaction(payloadTransaction)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('Transferência realizada!');
        },
        error: (err) => {
          console.log('Erro ao gravar dados da transação na api', err);
        },
      });
  }
}
