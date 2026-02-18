import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly http = inject (HttpClient);

  apiUrl = "http://localhost:3000"

  getAccount(): Observable<Account>{
    return this.http.get<Account>(`${this.apiUrl}/account`)
  }
  
  getTransaction(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`)
  }
  /* 
  getAddressByZipCode(): Observable<Address>{
    return this.http.get<Address>('https://viacep.com.br/ws/01001000/json/')
}
  getAddressByZipCode(zipCode): Observable<Address>{ 
    return this.http.get<Address>(`https://viacep.com.br/ws/${zipCode}/json/`) 
  } */

  constructor() { }
}
