import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Transaction } from '../../dashboard/models/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = "http://localhost:3000/transactions";

  constructor(private http: HttpClient) { }

  readTransaction(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.apiUrl}`)
  }

  readTransactionById(id:string): Observable<Transaction>{
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`)
  }

  createTransaction(transaction: Transaction): Observable<Transaction>{
    return this.http.post<Transaction>(`${this.apiUrl}`, transaction)
  }

  updateTransaction(transaction: Transaction, id:string): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/${id}`, transaction)
  }

  deleteTransaction(id:string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
