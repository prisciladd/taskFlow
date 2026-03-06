import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../../dashboard/models/transaction.model';
import { TransactionTypes } from '../../../../constants/transactions-types.enum';

@Injectable({ providedIn: 'root' })
export class AccountStore {
  // Comece com algum saldo mockado; pode vir da API em outro momento
  private readonly balanceSubject = new BehaviorSubject<number>(5230.75);
  readonly balance$ = this.balanceSubject.asObservable();

  private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  readonly transactions$ = this.transactionsSubject.asObservable();

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
      description,
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
      description,
      amount: -Math.abs(amount), // negativo
      type: TransactionTypes.EXPENSE,
    });
  }
}