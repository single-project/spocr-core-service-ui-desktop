import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateTimeTags'
})
export class DateTimeTagsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    if(moment(value, moment.ISO_8601).isValid()) {
      return moment(value, "MMM YYYY", 'ru').format("DD MMM YYYY");
    } else {
      return value
    }
  }
}
