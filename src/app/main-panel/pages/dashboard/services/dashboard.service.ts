import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { TransactionTypes } from '../../../../constants/transactions-types.enum';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  

  private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  readonly transactions$ = this.transactionsSubject.asObservable();

  private readonly http = inject(HttpClient);

  apiUrl = 'http://localhost:3000/account';

  getAccountData(): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}`);
  }

  updateBalance(newBalance: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}`, { balance: newBalance });
  }

  handleError() {
    console.error(throwError(() => new Error('Erro ao atualizar saldo')));
  }

  private pushTransaction(tx: Transaction) {
    const current = this.transactionsSubject.value;
    this.transactionsSubject.next([tx, ...current]);
  }

  credit(amount: number, description: string) {
    this.updateBalance(amount);

    this.pushTransaction({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      description: description,
      amount: amount, // positivo
      type: TransactionTypes.INCOME,
    });
  }

  debit(amount: number, description: string) {
    this.updateBalance(amount);

    this.pushTransaction({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      description: description,
      amount: -Math.abs(amount), // negativo
      type: TransactionTypes.EXPENSE,
    });
  }

 
}
