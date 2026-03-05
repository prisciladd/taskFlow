import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transfer } from '../models/transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransfersService {
  private readonly http = inject(HttpClient);

  apiUrl = 'http://localhost:3000';

  createTransfer(transfer: Transfer): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/transfers`, transfer);
  }

  readTransfers(): Observable<Transfer> {
    return this.http.get<Transfer>(`${this.apiUrl}/transfers`);
  }
}
