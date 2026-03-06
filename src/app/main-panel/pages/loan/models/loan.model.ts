export interface LoanSimulationInput {
    amount: number;        // valor solicitado
    installments: number;  // número de parcelas
    monthlyRate: number;   // taxa ao mês em decimal (ex: 0.023 = 2,3% a.m.)
  }
  
  export interface LoanSimulationResult {
    monthlyPayment: number;
    total: number;
    totalInterest: number;
  }
  
  export interface LoanContractRequest extends LoanSimulationInput {
    // campos adicionais que enviamos pro backend
  }
  
  export interface LoanContractResponse {
    id: string;
    createdAt: string;
  }