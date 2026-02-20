import { TransactionTypes } from "../../../../constants/transactions-types.enum";

export interface Transaction{
    id: number;
    date: string;
    description: string;
    amount: number;
    type: TransactionTypes
}