import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'nameTags'
})
export class DateTimeTagsPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    return (typeof value === 'object' && value.name) ? value.name : value;
  }
}
