import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionTypes } from '../../../../constants/transactions-types.enum';
import { Account } from '../../dashboard/models/account.model';
import { Transaction } from '../../dashboard/models/transaction.model';

@Injectable({ providedIn: 'root' })
export class AccountStore {
  // Comece com algum saldo mockado; pode vir da API em outro momento
  
  private readonly balanceSubject = new BehaviorSubject<number>(5000);
  readonly balance$ = this.balanceSubject.asObservable();
  
  private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  readonly transactions$ = this.transactionsSubject.asObservable();

  private readonly http = inject (HttpClient);

  apiUrl = "http://localhost:3000"

  getAccount(): Observable<Account>{
    return this.http.get<Account>(`${this.apiUrl}/account`)
  }

  get currentBalance(): number {
    return this.balanceSubject.value;
  }

  private pushTransaction(tx: Transaction) {
    const current = this.transactionsSubject.value;
    this.transactionsSubject.next([tx, ...current]);
  }

  credit(amount: number, description: string) {
    const newBalance = this.currentBalance + amount;
    this.balanceSubject.next(newBalance);

    this.pushTransaction({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      description: description,
      amount: amount, // positivo
      type: TransactionTypes.INCOME,
    });
  }

  debit(amount: number, description: string) {
    const newBalance = this.currentBalance - amount;
    this.balanceSubject.next(newBalance);

    this.pushTransaction({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      description:description,
      amount: -Math.abs(amount), // negativo
      type: TransactionTypes.EXPENSE,
    });
  }
}