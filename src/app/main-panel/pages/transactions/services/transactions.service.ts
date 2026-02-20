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

  getTransaction(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`)
  }

  postTransaction(transaction: Transaction): Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/transactions`, transaction)
  }
}
