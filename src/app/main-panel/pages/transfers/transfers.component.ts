import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Transfer } from './models/transfer.model';
import { TransfersService } from './services/transfers.service';
import { first } from 'rxjs';
import { TransactionTypes } from '../../../constants/transactions-types.enum';

@Component({
  selector: 'app-transfers',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule
  ],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css',
})
export class TransfersComponent implements OnInit {
  form!: FormGroup;
  transactionTypesEnum = TransactionTypes;

  private readonly transferService = inject(TransfersService);

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      account: new FormControl(),
      value: new FormControl(),
      description: new FormControl(),
      type: new FormControl(this.transactionTypesEnum.TRANSFER)
    });
  }

  onSubmit(): void {
    console.log('enviado');
    const payload: Transfer = this.form.getRawValue();

    this.transferService
      .createTransfer(payload)
      .pipe(first())
      .subscribe({
        next: () => {
          console.log('Transferência criada!');
        },
        error: (err) => {
          console.log('Erro ao gravar dados da transferência na api', err);
        },
      });
  }
}
