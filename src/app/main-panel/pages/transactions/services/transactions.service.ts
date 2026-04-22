import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Transaction } from '../../dashboard/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly apiUrl = 'http://localhost:3000/transactions';

  constructor(private readonly http: HttpClient) {}

  readTransaction(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleHttpError('listar transacoes')));
  }

  readTransactionById(id: string): Observable<Transaction> {
    return this.http
      .get<Transaction>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleHttpError('buscar transacao por id')));
  }

  createTransaction(
    transaction: Omit<Transaction, 'id'>,
  ): Observable<Transaction> {
    return this.http
      .post<Transaction>(`${this.apiUrl}`, transaction)
      .pipe(catchError(this.handleHttpError('criar transacao')));
  }

  updateTransaction(transaction: Transaction, id: string): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/${id}`, transaction)
      .pipe(catchError(this.handleHttpError('atualizar transacao')));
  }

  deleteTransaction(id: string): Observable<void> {
    const params = new HttpParams().set('motivo', 'cancelamento');
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`, { params })
      .pipe(catchError(this.handleHttpError('excluir transacao')));
  }

  private handleHttpError(operation: string) {
    return (error: unknown) => {
      console.error(`[TransactionsService] Erro ao ${operation}.`, error);
      return throwError(
        () => new Error(`Nao foi possivel ${operation}. Tente novamente.`),
      );
    };
  }
}
