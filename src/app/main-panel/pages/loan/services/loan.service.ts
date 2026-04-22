import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, delay, throwError } from 'rxjs';
import {
  LoanSimulationInput,
  LoanSimulationResult,
  LoanContractRequest,
  LoanContractResponse,
} from '../models/loan.model';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000';

  /**
   * Cálculo da prestação pelo sistema PRICE (francês).
   * Fórmula: PMT = PV * i / (1 - (1 + i)^(-n))
   */
  simulate(input: LoanSimulationInput): LoanSimulationResult {
    const { amount, installments, monthlyRate } = input;

    const i = monthlyRate; // já em decimal (ex: 0.023)
    const n = installments;
    if (amount <= 0 || n <= 0 || i < 0) {
      return { monthlyPayment: 0, total: 0, totalInterest: 0 };
    }

    // Trata caso de i=0 (sem juros) para evitar divisão por zero
    const monthlyPayment =
      i === 0 ? amount / n : amount * (i / (1 - Math.pow(1 + i, -n)));

    const total = monthlyPayment * n;
    const totalInterest = total - amount;

    // Arredonda para 2 casas (evita ruído visual)
    const round2 = (v: number) => Math.round(v * 100) / 100;

    return {
      monthlyPayment: round2(monthlyPayment),
      total: round2(total),
      totalInterest: round2(totalInterest),
    };
  }

  /** Exemplo: busca taxa mensal padrão da API (json-server ou backend). */
  getDefaultMonthlyRate(): Observable<number> {
    return this.http
      .get<{ personalLoanMonthlyRate: number }>(`${this.baseUrl}/rates`)
      .pipe(
        map((r) => r.personalLoanMonthlyRate / 100), // converte % para decimal
        catchError(this.handleHttpError('buscar taxa padrao de emprestimo')),
      );
  }

  /** Envia proposta/contratação de empréstimo */
  submitLoan(payload: LoanContractRequest): Observable<LoanContractResponse> {
    // Simula latência com delay opcional para UX de loading
    return this.http
      .post<LoanContractResponse>(`${this.baseUrl}/loans`, payload)
      .pipe(
        delay(600),
        catchError(this.handleHttpError('enviar proposta de emprestimo')),
      );
  }

  private handleHttpError(operation: string) {
    return (error: unknown) => {
      console.error(`[LoanService] Erro ao ${operation}.`, error);
      return throwError(
        () => new Error(`Nao foi possivel ${operation}. Tente novamente.`),
      );
    };
  }
}
