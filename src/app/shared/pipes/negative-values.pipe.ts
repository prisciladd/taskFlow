import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negativeValues',
})
export class NegativeValuesPipe implements PipeTransform {
  transform(value: string): string {
    if (value == 'income' || value == 'loan') {
      return 'text-success';
    }
    if (value == 'expense' || value == 'transfer') {
      return 'text-danger';
    } else {
      return '';
    }
  }
}
