import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionTypes } from '../../../../../constants/transactions-types.enum';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-create-transactions',
  imports: [ReactiveFormsModule],
  templateUrl: './create-transactions.component.html',
  styleUrl: './create-transactions.component.css'
})
export class CreateTransactionsComponent implements OnInit {
  form!: FormGroup;
  transactionTypesEnum = TransactionTypes
  private readonly transactionService = inject(TransactionsService)

  ngOnInit(): void {

    this.form = new FormGroup({

      date: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(),
      type: new FormControl(),

    });

  }

  onSubmit(): void{
          this.transactionService.postTransaction(this.form.value).subscribe({
     
    next: () => {
        console.log("Sucesso!");
        
    },
    error: (err) => {
      console.log("Erro ao buscar dados da conta na api",err);
      
    }

   });
      
  }

  
}