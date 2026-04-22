import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Transfer } from '../models/transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransfersService {
  private readonly http = inject(HttpClient);

  apiUrl = 'http://localhost:3000';

  createTransfer(transfer: Transfer): Observable<Transfer> {
    return this.http
      .post<Transfer>(`${this.apiUrl}/transfers`, transfer)
      .pipe(catchError(this.handleHttpError('criar transferencia')));
  }

  readTransfers(): Observable<Transfer> {
    return this.http
      .get<Transfer>(`${this.apiUrl}/transfers`)
      .pipe(catchError(this.handleHttpError('listar transferencias')));
  }

  private handleHttpError(operation: string) {
    return (error: unknown) => {
      console.error(`[TransfersService] Erro ao ${operation}.`, error);
      return throwError(
        () => new Error(`Nao foi possivel ${operation}. Tente novamente.`),
      );
    };
  }
}
