import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TransactionTypes } from '../../../../../constants/transactions-types.enum';
import { TransactionsService } from '../../services/transactions.service';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNgxMask } from 'ngx-mask';
import { provideNativeDateAdapter } from '@angular/material/core';
import { first } from 'rxjs';

@Component({
  selector: 'app-create-transactions',
  imports: [ReactiveFormsModule,MatInputModule,MatDatepickerModule,MatFormFieldModule],
  templateUrl: './create-transactions.component.html',
  styleUrl: './create-transactions.component.css',
  providers: [provideNgxMask(),provideNativeDateAdapter()]
})
export class CreateTransactionsComponent implements OnInit {
  form!: FormGroup;
  transactionTypesEnum = TransactionTypes;
  /* today = new Date ().toISOString().substring(0,10); */
  todayLocale = new Date().toLocaleDateString().split('/');
  todayISO = `${this.todayLocale[2]}-${this.todayLocale[1]}-${this.todayLocale[0]}`;
  private readonly transactionService = inject(TransactionsService);

  ngOnInit(): void {

    this.form = new FormGroup({

      date: new FormControl(this.todayISO/* [Validators.required, this.dateRangeValidator(new Date(2026,0,1), new Date())] */),
      description: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      amount: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),

    });

  }

  onSubmit(): void{
          this.transactionService.postTransaction(this.form.value).pipe(first()).subscribe({
     
    next: () => {
        console.log("Sucesso!");
        
    },
    error: (err) => {
      console.log("Erro ao buscar dados da conta na api",err);
      
    }

   });
      
  }

  dateRangeValidator(minDate: Date, maxDate:Date): ValidatorFn {
    return (control:AbstractControl):ValidationErrors | null =>{
      
      if (!control.value) return null;

      const value = new Date (control.value);

      if (isNaN(value.getTime())){
        return {invalidDate:true};
      }
      
      if ( value <= minDate || value >= maxDate){
        return {dateOutOfRange:{
          min: minDate,
          max: maxDate,
          actual: value,
        }}
      }

      return null;
    }

  }
}