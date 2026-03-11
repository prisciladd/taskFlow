import { Pipe, PipeTransform } from '@angular/core';
import { TransactionTypes } from '../../constants/transactions-types.enum';

@Pipe({
  name: 'negativeValues',
})
export class NegativeValuesPipe implements PipeTransform {
  transform(value: string): string {
    if (value == TransactionTypes.INCOME || value == TransactionTypes.LOAN) {
      return 'text-success';
    }
    if (value == TransactionTypes.EXPENSE || value == TransactionTypes.TRANSFER) {
      return 'text-danger';
    } else {
      return '';
    }
  }
}
