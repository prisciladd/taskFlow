import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transaction } from '../../dashboard/models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private readonly http = inject (HttpClient);

  apiUrl = "http://localhost:3000"

  readTransaction(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`)
  }

  readTransactionById(id:string): Observable<Transaction>{
    return this.http.get<Transaction>(`${this.apiUrl}/transactions/${id}`)
  }

  createTransaction(transaction: Transaction): Observable<Transaction>{
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction)
  }

  updateTransaction(transaction: Transaction, id:string): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/transactions/${id}`, transaction)
  }

  deleteTransaction(id:string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/transactions/${id}`)
  }
}
