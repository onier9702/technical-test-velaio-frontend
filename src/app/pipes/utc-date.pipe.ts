import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'utcDate',
  standalone: true,
})
export class UtcDatePipe implements PipeTransform {

  transform(value: any, format: string = 'yyyy-MM-dd HH:mm', locale: string = 'en-US'): string | null {
    
    if (!value) return null;

    return formatDate(value, format, locale, 'UTC');
  }

}
