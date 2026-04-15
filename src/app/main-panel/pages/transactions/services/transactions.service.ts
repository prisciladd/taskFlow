import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../dashboard/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly apiUrl = 'http://localhost:3000/transactions';

  constructor(private readonly http: HttpClient) {}

  readTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}`);
  }

  readTransactionById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  createTransaction(
    transaction: Omit<Transaction, 'id'>,
  ): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}`, transaction);
  }

  updateTransaction(transaction: Transaction, id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, transaction);
  }

  deleteTransaction(id: string): Observable<void> {
    const params = new HttpParams().set('motivo', 'cancelamento');
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { params });
  }
}
